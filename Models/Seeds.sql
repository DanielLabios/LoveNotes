/*insert seed sql here*/

TRUNCATE TABLE "Speeches";
INSERT INTO "Speeches" ("UserId", "Title", "SpeechKey", "TimeSlot" ) VALUES ('1', 'Batman Fights Crime', 'BmanFC1', '2020-10-13 19:00:00');
INSERT INTO "Speeches" ("UserId", "Title", "SpeechKey", "TimeSlot" ) VALUES ('1', 'Batman Teaches Robin', 'BmanTR2', '2020-11-13 18:00:00');
INSERT INTO "Speeches" ("UserId", "Title", "SpeechKey", "TimeSlot" ) VALUES ('2', 'Supermans Identity', 'SmanI1', '2020-11-14 17:00:00');
INSERT INTO "Speeches" ("UserId", "Title", "SpeechKey", "TimeSlot" ) VALUES ('2', 'The Justice League', 'SmanTJL2', '2020-11-15 18:30:00');
INSERT INTO "Speeches" ("UserId", "Title", "SpeechKey", "TimeSlot" ) VALUES ('2', 'Working At The Daily Planet', 'SmanWDP3', '2020-11-16 17:30:00');


TRUNCATE TABLE "Notes";
INSERT INTO "Notes" ("UserId", "SpeechId", "Author", "Body", "Opened") VALUES ('1', '1', 'Timmy Kins', 'Wonderful Speech! I felt very strongly about your performance! Be careful about closing your eyes when your speaking. It creates a disconnect with the audience.','FALSE');
INSERT INTO "Notes" ("UserId", "SpeechId", "Author", "Body", "Opened") VALUES ('1', '2', 'Johnny Hash', 'You have been improving on your public skills since you fist joined 7 months ago. Job well done! Do not slow down! Do not be scared about pausing when speaking. Use it instead for dramatic effect.','FALSE');
INSERT INTO "Notes" ("UserId", "SpeechId", "Author", "Body", "Opened") VALUES ('2', '3', 'Candy Miens', 'I am inspired by how well you have been improving. I really love your gestures and your ability to describe the story through your body movement. Be cognizant about closing your eyes for too long.','FALSE');
INSERT INTO "Notes" ("UserId", "SpeechId", "Author", "Body", "Opened") VALUES ('2', '4', 'Stephen', 'Try to speak up a bit more for us in the back. I can hear you projecting your voice, but make it a little louder so the effect can be felt back here too.','FALSE');
INSERT INTO "Notes" ("UserId", "SpeechId", "Author", "Body", "Opened") VALUES ('2', '5', 'Anonymous', 'Thanks for having me! I think you did an awesome job! :o','FALSE');
INSERT INTO "Notes" ("UserId", "SpeechId", "Author", "Body", "Opened") VALUES ('2', '5', 'Tiffany from Stirling TM2', 'Carol, no wonder your prez is boasting about you! Well done speech. Vivid storytelling! Started strong and ended fairly well! I would suggest you work on Cadence. Come see me when you get the chance.2','FALSE');
INSERT INTO "Notes" ("UserId", "SpeechId", "Author", "Body", "Opened") VALUES ('2', '5', 'Timmy Kins2', 'Wonderful Speech! I felt very strongly about your performance! Be careful about closing your eyes when your speaking. It creates a disconnect with the audience.2','FALSE');
INSERT INTO "Notes" ("UserId", "SpeechId", "Author", "Body", "Opened") VALUES ('2', '5', 'Johnny Hash2', 'You have been improving on your public skills since you fist joined 7 months ago. Job well done! Do not slow down! Do not be scared about pausing when speaking. Use it instead for dramatic effect.2','FALSE');
INSERT INTO "Notes" ("UserId", "SpeechId", "Author", "Body", "Opened") VALUES ('2', '5', 'Candy Miens2', 'I am inspired by how well you have been improving. I really love your gestures and your ability to describe the story through your body movement. Be cognizant about closing your eyes for too long.2','TRUE');
INSERT INTO "Notes" ("UserId", "SpeechId", "Author", "Body", "Opened") VALUES ('2', '5', 'Stephen2', 'Try to speak up a bit more for us in the back. I can hear you projecting your voice, but make it a little louder so the effect can be felt back here too.2','FALSE');
