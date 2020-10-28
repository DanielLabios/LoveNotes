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
    [Migration("20201018184404_AddUserEmailIndex")]
    partial class AddUserEmailIndex
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

                    b.Property<string>("SpeechKey")
                        .HasColumnType("text");

                    b.Property<DateTime>("TimeSlot")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int?>("UserId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Speeches");
                });

            modelBuilder.Entity("LoveNotes.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<string>("EmailAddress")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("HashedPassword")
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.Property<string>("UserName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("LoveNotes.Models.Note", b =>
                {
                    b.HasOne("LoveNotes.Models.Speech", null)
                        .WithMany("Notes")
                        .HasForeignKey("SpeechId");
                });

            modelBuilder.Entity("LoveNotes.Models.Speech", b =>
                {
                    b.HasOne("LoveNotes.Models.User", null)
                        .WithMany("Speeches")
                        .HasForeignKey("UserId");
                });
#pragma warning restore 612, 618
        }
    }
}
