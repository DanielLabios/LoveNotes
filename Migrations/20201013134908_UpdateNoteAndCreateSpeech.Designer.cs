﻿// <auto-generated />
using System;
using LoveNotes.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace LoveNotes.Migrations
{
    [DbContext(typeof(DatabaseContext))]
    [Migration("20201013134908_UpdateNoteAndCreateSpeech")]
    partial class UpdateNoteAndCreateSpeech
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn)
                .HasAnnotation("ProductVersion", "3.1.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            modelBuilder.Entity("LoveNotes.Models.Note", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<string>("Author")
                        .HasColumnType("text");

                    b.Property<string>("Body")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<bool>("Opened")
                        .HasColumnType("boolean");

                    b.Property<int>("Speech")
                        .HasColumnType("integer");

                    b.Property<int?>("SpeechId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("SpeechId");

                    b.ToTable("Notes");
                });

            modelBuilder.Entity("LoveNotes.Models.Speech", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<TimeSpan>("OpenFeedbackPeriod")
                        .HasColumnType("interval");

                    b.Property<int>("RegisteredSpeaker")
                        .HasColumnType("integer");

                    b.Property<string>("SpeechKey")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime>("TimeSlot")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Speeches");
                });

            modelBuilder.Entity("LoveNotes.Models.Note", b =>
                {
                    b.HasOne("LoveNotes.Models.Speech", null)
                        .WithMany("Notes")
                        .HasForeignKey("SpeechId");
                });
#pragma warning restore 612, 618
        }
    }
}
