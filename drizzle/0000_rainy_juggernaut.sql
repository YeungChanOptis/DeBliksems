CREATE TABLE "cost" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"amount" numeric NOT NULL,
	"type" text NOT NULL,
	"training_request_id" uuid
);
--> statement-breakpoint
CREATE TABLE "training_request" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"description" text,
	"duration_days" numeric NOT NULL,
	"status" text,
	"user_id" uuid,
	"training_id" uuid
);
--> statement-breakpoint
CREATE TABLE "training" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"date" date NOT NULL,
	"description" text,
	"price" numeric NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"email" text NOT NULL,
	"remaining_budget" numeric NOT NULL,
	"role" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "cost" ADD CONSTRAINT "cost_training_request_id_training_request_id_fk" FOREIGN KEY ("training_request_id") REFERENCES "public"."training_request"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "training_request" ADD CONSTRAINT "training_request_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "training_request" ADD CONSTRAINT "training_request_training_id_training_id_fk" FOREIGN KEY ("training_id") REFERENCES "public"."training"("id") ON DELETE no action ON UPDATE no action;