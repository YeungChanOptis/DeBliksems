ALTER TABLE "training" RENAME COLUMN "date" TO "startDate";--> statement-breakpoint
ALTER TABLE "training" ADD COLUMN "endDate" date NOT NULL;