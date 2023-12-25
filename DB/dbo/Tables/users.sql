CREATE TABLE [dbo].[users] (
    [user_id]      INT            IDENTITY (1, 1) NOT NULL,
    [username]     NVARCHAR (255) NOT NULL,
    [password]     NVARCHAR (255) NOT NULL,
    [name]         NVARCHAR (255) NOT NULL,
    [login_time]   DATETIME       NOT NULL,
    [access_token] NVARCHAR (255) NOT NULL
);
GO

ALTER TABLE [dbo].[users]
    ADD CONSTRAINT [PK_96aac72f1574b88752e9fb00089] PRIMARY KEY CLUSTERED ([user_id] ASC);
GO

ALTER TABLE [dbo].[users]
    ADD CONSTRAINT [DF_33cd39d2d7524450a6d16617ca7] DEFAULT ('') FOR [access_token];
GO

ALTER TABLE [dbo].[users]
    ADD CONSTRAINT [DF_275d3357fb392c43bfb0acc3046] DEFAULT (getdate()) FOR [login_time];
GO

