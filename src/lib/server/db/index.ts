import { drizzle } from 'drizzle-orm/postgres-js';
import * as schema from './schema';
import { env } from '$env/dynamic/private';
import {reset, seed} from 'drizzle-seed';
import postgres from 'postgres';
import {hash} from "@node-rs/argon2";
import {DrizzlePostgreSQLAdapter} from "@lucia-auth/adapter-drizzle";
import {COST_TYPES} from "./schema";

// // Uncomment for deployed AWS db
// export const db = drizzle({
//     connection: {
//         host: 'stages-db-instance.cmwzelbl6g4t.eu-west-1.rds.amazonaws.com',
//         port: 5432,
//         password: 'stormvogels123',
//         user: 'postgres',
//         database: 'de-bliksems',
//         ssl: {
//             rejectUnauthorized: false
//         }
//     },
// schema
// });

const client = postgres(env.DATABASE_URL);

export const db = drizzle(client, {
	schema
});

export const adapter = new DrizzlePostgreSQLAdapter(db, schema.sessionTable, schema.userTable);

await reset(db, schema);

const hashedDummyPw = await hash(env.DUMMY_PW, {
	memoryCost: 19456,
	timeCost: 2,
	outputLen: 32,
	parallelism: 1
});

await db.insert(schema.userTable).values([
	{
		id: 'd08127ed-083f-4f39-82d1-185d108f3c23',
		firstName: 'test',
		lastName: 'tester',
		email: 'test@mail.be',
		passwordHash: hashedDummyPw,
		remainingBudget: '4500',
		role: 'USER'
	},
	{
		id: '1b5bf7b3-e1a4-45d1-a739-c7b5663c06ae',
		firstName: 'admin',
		lastName: 'admin',
		email: 'admin@mail.be',
		passwordHash: hashedDummyPw,
		remainingBudget: '4500',
		role: 'ADMIN'
	}
]);


await seed(db, {
	training: schema.trainingTable,
	trainingRequest: schema.trainingRequestTable
}).refine((f) => ({
	training: {
		columns: {
			description: f.valuesFromArray({
				values: [
					'De Tech Future Summit brengt toonaangevende experts, ondernemers en innovators samen om de nieuwste trends in kunstmatige intelligentie, blockchain en cybersecurity te bespreken. Gedurende twee dagen zullen gerenommeerde sprekers hun inzichten delen over de impact van technologie op de toekomst van het bedrijfsleven. Naast inspirerende keynotes zijn er interactieve workshops en netwerkmogelijkheden met professionals uit diverse sectoren. Sluit je aan bij ons en ontdek hoe technologie jouw organisatie kan transformeren!',
					'De Green Future Conference richt zich op innovatieve oplossingen voor klimaatverandering en duurzame bedrijfsvoering. Experts uit de academische wereld, overheid en industrie delen hun kennis over circulaire economie, hernieuwbare energie en milieuvriendelijke technologieën. Door middel van paneldiscussies en interactieve sessies krijg je concrete strategieën aangereikt om duurzaamheidsdoelen te behalen. Kom en werk mee aan een groenere toekomst!',
					'Tijdens de Digital Growth Summit leer je van topexperts hoe je effectieve marketingstrategieën ontwikkelt in het digitale tijdperk. Onderwerpen zoals SEO, social media, contentmarketing en AI-gedreven personalisatie staan centraal in diverse sessies. Praktische workshops helpen je direct toepasbare technieken te ontwikkelen om jouw merk te laten groeien. Mis deze kans niet om te netwerken met branchegenoten en de nieuwste trends te ontdekken!',
					'De Healthcare Innovation Forum biedt een platform voor medische professionals, onderzoekers en technologieleveranciers om de toekomst van de gezondheidszorg te bespreken. Van digitale gezondheidszorg en telemedicine tot AI in diagnostiek, deze conferentie behandelt de nieuwste doorbraken in de sector. Door middel van casestudies en paneldiscussies krijg je inzicht in hoe technologie patiëntenzorg kan verbeteren. Sluit je aan en maak deel uit van de revolutie in de gezondheidszorg!'
				]
			}),
			price: f.number({
				minValue: 100,
				maxValue: 300,
				precision: 2
			})
		}
	},
	trainingRequest: {
		columns: {
			userId: f.valuesFromArray({
				values: ['d08127ed-083f-4f39-82d1-185d108f3c23', '1b5bf7b3-e1a4-45d1-a739-c7b5663c06ae']
			}),
			durationDays: f.int({
				minValue: 1,
				maxValue: 4
			}),
			status: f.valuesFromArray({ values: ['PENDING', 'APPROVED', 'DENIED'] })
		}
	}
}));

const trainingRequests = await db
	.select({
		id: schema.trainingRequestTable.id,
	})
	.from(schema.trainingRequestTable);

await seed(db, {
	cost: schema.costTable
}).refine((f) => ({
	cost: {
		columns: {
			trainingRequestId:
				f.valuesFromArray({values: trainingRequests.map(r => r.id)}),
			type:
				f.valuesFromArray({values: COST_TYPES}),
			amount: f.number({
				minValue: 1,
				maxValue: 50,
				precision: 2
			}),
		}
	}
}));
