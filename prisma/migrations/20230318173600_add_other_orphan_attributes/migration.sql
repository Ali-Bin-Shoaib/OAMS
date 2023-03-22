/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- DropTable
DROP TABLE [dbo].[User];

-- CreateTable
CREATE TABLE [dbo].[Orphan] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000) NOT NULL,
    [gender] BIT NOT NULL,
    [birthdate] DATETIME2 NOT NULL,
    [birthplace] NVARCHAR(1000) NOT NULL,
    [isMotherWorks] BIT NOT NULL,
    [motherName] NVARCHAR(1000) NOT NULL,
    [currentAddress] NVARCHAR(1000) NOT NULL,
    [fatherDeathDate] DATETIME2 NOT NULL,
    [joinDate] DATETIME2 NOT NULL,
    [motherJob] NVARCHAR(1000) NOT NULL,
    [liveWith] NVARCHAR(1000) NOT NULL,
    [evaluation] FLOAT(53) NOT NULL,
    CONSTRAINT [Orphan_pkey] PRIMARY KEY CLUSTERED ([id])
);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
