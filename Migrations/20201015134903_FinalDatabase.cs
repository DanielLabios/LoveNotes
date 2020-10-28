using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace LoveNotes.Migrations
{
    public partial class FinalDatabase : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "OpenFeedbackPeriod",
                table: "Speeches");

            migrationBuilder.AlterColumn<string>(
                name: "SpeechKey",
                table: "Speeches",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "RegisteredUsers",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AddColumn<string>(
                name: "UserName",
                table: "RegisteredUsers",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UserName",
                table: "RegisteredUsers");

            migrationBuilder.AlterColumn<string>(
                name: "SpeechKey",
                table: "Speeches",
                type: "text",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AddColumn<TimeSpan>(
                name: "OpenFeedbackPeriod",
                table: "Speeches",
                type: "interval",
                nullable: false,
                defaultValue: new TimeSpan(0, 0, 0, 0, 0));

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "RegisteredUsers",
                type: "text",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);
        }
    }
}
