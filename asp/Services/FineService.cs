using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.GridFS;
using System.Threading.Tasks;
using Fines.Models;
using System.Collections.Generic;

namespace Fines.Services
{
    public class FineService
    {
        IGridFSBucket gridFS;   
        IMongoCollection<Fine> fines;

        private string connectionString = "mongodb://localhost:27017";

        public FineService()
        {
            MongoClient client = new MongoClient(connectionString);
            IMongoDatabase database = client.GetDatabase("fines");

            gridFS = new GridFSBucket(database);
            fines = database.GetCollection<Fine>("fines");
        }

        public async Task<List<Fine>> GetAllFines()
        {
            List<Fine> f = new List<Fine>();
            var filter = new BsonDocument();

            using (var cursor = await fines.FindAsync(filter))
            {
                while (await cursor.MoveNextAsync())
                {
                    var fines = cursor.Current;

                    f = new List<Fine>(fines);
                }
            }

            return f;
        }

        public async Task<Fine> GetFine(string id)
        {
            return await fines.Find(new BsonDocument("_id", id)).FirstOrDefaultAsync();
        }

		public async Task Create(Fine fine)
        {
            await fines.InsertOneAsync(fine);
        }

        public async Task Update(Fine fine)
        {
            await fines.ReplaceOneAsync(new BsonDocument("_id", fine.Id), fine);
        }

        public async Task Remove(string id)
        {
            await fines.DeleteOneAsync(new BsonDocument("_id", id));
        }
    }
}