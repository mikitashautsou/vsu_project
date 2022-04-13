using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.ComponentModel.DataAnnotations;

namespace Fines.Models
{
	public class Fine
	{
		[BsonId]
		public string Id { get; set; }

		[BsonElement("description")]
		public string Description { get; set; }

		[BsonElement("fine_amount")]
		public double FineAmount { get; set; }

		[BsonElement("status")]
		public bool Status { get; set; }

		public Fine()
		{

		}

		public Fine(Fine fine)
		{
			Id = fine.Id;
			Description = fine.Description;
			FineAmount = fine.FineAmount;
			Status = fine.Status;
		}

		public Fine(string id, string description,
			double fineAmount, bool status)
		{
			Id = id;
			Description = description;
			FineAmount = fineAmount;
			Status = status;
		}
	}

	public enum Status
	{
		Paid,
		NotPaid
	}
}
