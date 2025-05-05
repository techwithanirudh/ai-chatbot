CREATE TABLE IF NOT EXISTS "ai-chatbot_account" (
	"userId" uuid NOT NULL,
	"type" varchar(255) NOT NULL,
	"provider" varchar(255) NOT NULL,
	"providerAccountId" varchar(255) NOT NULL,
	"refresh_token" text,
	"access_token" text,
	"expires_at" integer,
	"token_type" varchar(255),
	"scope" varchar(255),
	"id_token" text,
	"session_state" varchar(255),
	CONSTRAINT "ai-chatbot_account_provider_providerAccountId_pk" PRIMARY KEY("provider","providerAccountId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ai-chatbot_session" (
	"sessionToken" varchar(255) PRIMARY KEY NOT NULL,
	"userId" uuid NOT NULL,
	"expires" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ai-chatbot_user" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255),
	"email" varchar(255) NOT NULL,
	"emailVerified" timestamp with time zone,
	"image" varchar(255)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ai-chatbot_verificationToken" (
	"identifier" text NOT NULL,
	"token" text NOT NULL,
	"expires" timestamp NOT NULL,
	CONSTRAINT "ai-chatbot_verificationToken_identifier_token_pk" PRIMARY KEY("identifier","token")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ai-chatbot_chat" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"createdAt" timestamp NOT NULL,
	"title" text NOT NULL,
	"userId" uuid NOT NULL,
	"visibility" varchar DEFAULT 'private' NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ai-chatbot_document" (
	"id" uuid DEFAULT gen_random_uuid() NOT NULL,
	"createdAt" timestamp NOT NULL,
	"title" text NOT NULL,
	"content" text,
	"text" varchar DEFAULT 'text' NOT NULL,
	"userId" uuid NOT NULL,
	CONSTRAINT "ai-chatbot_document_id_createdAt_pk" PRIMARY KEY("id","createdAt")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ai-chatbot_message_v2" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"chatId" uuid NOT NULL,
	"role" varchar NOT NULL,
	"parts" json NOT NULL,
	"attachments" json NOT NULL,
	"createdAt" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ai-chatbot_message" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"chatId" uuid NOT NULL,
	"role" varchar NOT NULL,
	"content" json NOT NULL,
	"createdAt" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ai-chatbot_suggestion" (
	"id" uuid DEFAULT gen_random_uuid() NOT NULL,
	"documentId" uuid NOT NULL,
	"documentCreatedAt" timestamp NOT NULL,
	"originalText" text NOT NULL,
	"suggestedText" text NOT NULL,
	"description" text,
	"isResolved" boolean DEFAULT false NOT NULL,
	"userId" uuid NOT NULL,
	"createdAt" timestamp NOT NULL,
	CONSTRAINT "ai-chatbot_suggestion_id_pk" PRIMARY KEY("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ai-chatbot_vote_v2" (
	"chatId" uuid NOT NULL,
	"messageId" uuid NOT NULL,
	"isUpvoted" boolean NOT NULL,
	CONSTRAINT "ai-chatbot_vote_v2_chatId_messageId_pk" PRIMARY KEY("chatId","messageId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ai-chatbot_vote" (
	"chatId" uuid NOT NULL,
	"messageId" uuid NOT NULL,
	"isUpvoted" boolean NOT NULL,
	CONSTRAINT "ai-chatbot_vote_chatId_messageId_pk" PRIMARY KEY("chatId","messageId")
);
--> statement-breakpoint
DROP TABLE "Vote_v2";--> statement-breakpoint
DROP TABLE "Vote";--> statement-breakpoint
DROP TABLE "Message_v2";--> statement-breakpoint
DROP TABLE "Message";--> statement-breakpoint
DROP TABLE "Suggestion";--> statement-breakpoint
DROP TABLE "Document";--> statement-breakpoint
DROP TABLE "Chat";--> statement-breakpoint
DROP TABLE "User";--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ai-chatbot_account" ADD CONSTRAINT "ai-chatbot_account_userId_ai-chatbot_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."ai-chatbot_user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ai-chatbot_session" ADD CONSTRAINT "ai-chatbot_session_userId_ai-chatbot_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."ai-chatbot_user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ai-chatbot_chat" ADD CONSTRAINT "ai-chatbot_chat_userId_ai-chatbot_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."ai-chatbot_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ai-chatbot_document" ADD CONSTRAINT "ai-chatbot_document_userId_ai-chatbot_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."ai-chatbot_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ai-chatbot_message_v2" ADD CONSTRAINT "ai-chatbot_message_v2_chatId_ai-chatbot_chat_id_fk" FOREIGN KEY ("chatId") REFERENCES "public"."ai-chatbot_chat"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ai-chatbot_message" ADD CONSTRAINT "ai-chatbot_message_chatId_ai-chatbot_chat_id_fk" FOREIGN KEY ("chatId") REFERENCES "public"."ai-chatbot_chat"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ai-chatbot_suggestion" ADD CONSTRAINT "ai-chatbot_suggestion_userId_ai-chatbot_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."ai-chatbot_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ai-chatbot_suggestion" ADD CONSTRAINT "ai-chatbot_suggestion_documentId_documentCreatedAt_ai-chatbot_document_id_createdAt_fk" FOREIGN KEY ("documentId","documentCreatedAt") REFERENCES "public"."ai-chatbot_document"("id","createdAt") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ai-chatbot_vote_v2" ADD CONSTRAINT "ai-chatbot_vote_v2_chatId_ai-chatbot_chat_id_fk" FOREIGN KEY ("chatId") REFERENCES "public"."ai-chatbot_chat"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ai-chatbot_vote_v2" ADD CONSTRAINT "ai-chatbot_vote_v2_messageId_ai-chatbot_message_v2_id_fk" FOREIGN KEY ("messageId") REFERENCES "public"."ai-chatbot_message_v2"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ai-chatbot_vote" ADD CONSTRAINT "ai-chatbot_vote_chatId_ai-chatbot_chat_id_fk" FOREIGN KEY ("chatId") REFERENCES "public"."ai-chatbot_chat"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ai-chatbot_vote" ADD CONSTRAINT "ai-chatbot_vote_messageId_ai-chatbot_message_id_fk" FOREIGN KEY ("messageId") REFERENCES "public"."ai-chatbot_message"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
