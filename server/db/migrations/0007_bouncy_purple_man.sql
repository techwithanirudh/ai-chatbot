ALTER TABLE "ai-chatbot_chat" DROP CONSTRAINT "ai-chatbot_chat_userId_ai-chatbot_user_id_fk";
--> statement-breakpoint
ALTER TABLE "ai-chatbot_document" DROP CONSTRAINT "ai-chatbot_document_userId_ai-chatbot_user_id_fk";
--> statement-breakpoint
ALTER TABLE "ai-chatbot_suggestion" DROP CONSTRAINT "ai-chatbot_suggestion_userId_ai-chatbot_user_id_fk";
--> statement-breakpoint
DROP TABLE "ai-chatbot_account";--> statement-breakpoint
DROP TABLE "ai-chatbot_session";--> statement-breakpoint
DROP TABLE "ai-chatbot_user";--> statement-breakpoint
DROP TABLE "ai-chatbot_verificationToken";--> statement-breakpoint
TRUNCATE TABLE "ai-chatbot_chat" CASCADE;--> statement-breakpoint
TRUNCATE TABLE "ai-chatbot_document" CASCADE;--> statement-breakpoint
TRUNCATE TABLE "ai-chatbot_suggestion" CASCADE;--> statement-breakpoint
ALTER TABLE "ai-chatbot_chat" DROP COLUMN "userId";--> statement-breakpoint
ALTER TABLE "ai-chatbot_document" DROP COLUMN "userId";--> statement-breakpoint
ALTER TABLE "ai-chatbot_suggestion" DROP COLUMN "userId";--> statement-breakpoint
ALTER TABLE "ai-chatbot_chat" ADD COLUMN "userId" INTEGER NOT NULL;--> statement-breakpoint
ALTER TABLE "ai-chatbot_document" ADD COLUMN "userId" INTEGER NOT NULL;--> statement-breakpoint
ALTER TABLE "ai-chatbot_suggestion" ADD COLUMN "userId" INTEGER NOT NULL;--> statement-breakpoint
CREATE INDEX "idx_chat_userId" ON "ai-chatbot_chat" ("userId");--> statement-breakpoint
CREATE INDEX "idx_document_userId" ON "ai-chatbot_document" ("userId");--> statement-breakpoint
CREATE INDEX "idx_suggestion_userId" ON "ai-chatbot_suggestion" ("userId");--> statement-breakpoint