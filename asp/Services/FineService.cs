using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.GridFS;
using System.Threading.Tasks;
using Fines.Models;

namespace Fines.Services
{
    public class FineService
    {
        IGridFSBucket gridFS;   
        IMongoCollection<Fine> fines; 

        public FineService()
        {
            string connectionString = "mongodb://127.0.0.1:27017";
            var connection = new MongoUrlBuilder(connectionString);

            MongoClient client = new MongoClient(connectionString);
            IMongoDatabase database = client.GetDatabase(connection.DatabaseName);

            gridFS = new GridFSBucket(database);
            fines = database.GetCollection<Fine>("Fines");
        }

        public async Task<Fine> GetFine(string id)
        {
            return await fines.Find(new BsonDocument("_id", new ObjectId(id))).FirstOrDefaultAsync();
        }

        public async Task Create(Fine fine)
        {
            await fines.InsertOneAsync(fine);
        }

        public async Task Update(Fine fine)
        {
            await fines.ReplaceOneAsync(new BsonDocument("_id", new ObjectId(fine.UserId)), fine);
        }

        public async Task Remove(string id)
        {
            await fines.DeleteOneAsync(new BsonDocument("_id", new ObjectId(id)));
        }
    }
}