namespace ExpenditureApp.Services.PasswordHasher
{
    public interface IPasswordHasher
    {
        string HashPassword(string password);
        bool Veryfy(string password, string passwordHash);
    }
}