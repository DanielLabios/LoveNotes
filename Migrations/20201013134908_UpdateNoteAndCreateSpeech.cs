using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace LoveNotes.Migrations
{
    public partial class UpdateNoteAndCreateSpeech : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Body",
                table: "Notes",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Speech",
                table: "Notes",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "SpeechId",
                table: "Notes",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Speeches",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    RegisteredSpeaker = table.Column<int>(nullable: false),
                    Title = table.Column<string>(nullable: false),
                    SpeechKey = table.Column<string>(nullable: false),
                    TimeSlot = table.Column<DateTime>(nullable: false),
                    OpenFeedbackPeriod = table.Column<TimeSpan>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Speeches", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Notes_SpeechId",
                table: "Notes",
                column: "SpeechId");

            migrationBuilder.AddForeignKey(
                name: "FK_Notes_Speeches_SpeechId",
                table: "Notes",
                column: "SpeechId",
                principalTable: "Speeches",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Notes_Speeches_SpeechId",
                table: "Notes");

            migrationBuilder.DropTable(
                name: "Speeches");

            migrationBuilder.DropIndex(
                name: "IX_Notes_SpeechId",
                table: "Notes");

            migrationBuilder.DropColumn(
                name: "Speech",
                table: "Notes");

            migrationBuilder.DropColumn(
                name: "SpeechId",
                table: "Notes");

            migrationBuilder.AlterColumn<string>(
                name: "Body",
                table: "Notes",
                type: "text",
                nullable: true,
                oldClrType: typeof(string));
        }
    }
}
