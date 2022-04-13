using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Fines.Models;
using Fines.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Bson;
using System.Net;
using System.IO;

// TODO: Считывание чисел
// TODO: Проверка аутентификации

namespace Fines.Controllers
{
	public class HomeController : Controller
	{
		private FineService fineService = new FineService();
		private string token;
		private User user;

		public ActionResult Auth()
		{
			return View();
		}

		[HttpPost]
		public ActionResult Auth(Creds creds)
		{
			string userData;

			if (SignIn(creds, out userData))
			{
				return RedirectToAction(nameof(Index));
			}

			return View();
		}

		public async Task<ActionResult> Index()
		{
			List<Fine> fines = new List<Fine>();
			fines = await fineService.GetAllFines();

			ViewBag.Fines = fines;

			return View("Index");
		}

		[HttpGet]
		public ActionResult Create()
		{
			return View("Create");
		}

		[HttpPost]
		public async Task<ActionResult> Create(Fine fine)
		{
			Fine f = new Fine(fine);
			f.Id = ObjectId.GenerateNewId(DateTime.Now).ToString();
			

			await fineService.Create(f);

			try
			{
				return RedirectToAction(nameof(Index));
			}
			catch
			{
				return View("Index");
			}
		}

		[HttpGet]
		public async Task<ActionResult> Edit(string id)
		{
			ViewBag.EditFine = await fineService.GetFine(id);

			return View("Edit");
		}

		[HttpPost]
		public async Task<ActionResult> Edit(Fine fine)
		{
			Fine f = new Fine(fine);

			await fineService.Update(f);

			try
			{
				return RedirectToAction(nameof(Index));
			}
			catch
			{
				return View("Index");
			}
		}

		[HttpGet]
		public async Task<ActionResult> Delete(string id)
		{
			await fineService.Remove(id);

			return RedirectToAction(nameof(Index));
		}

		private bool SignIn(Creds creds, out string userData)
		{
			WebRequest request = WebRequest.Create("http://localhost:4000/sign-in");
			request.Method = "POST";
			request.ContentType = "application/x-www-form-urlencoded";
			request.Credentials = CredentialCache.DefaultCredentials;
			
			string data = creds.ToJson();
			byte[] bytes = System.Text.Encoding.UTF8.GetBytes(data);
			request.ContentLength = bytes.Length;

			using (Stream dataStream = request.GetRequestStream())
			{
				dataStream.Write(bytes, 0, bytes.Length);
				dataStream.Close();
			}

			try
			{
				WebResponse response = request.GetResponse();

				using (Stream stream = response.GetResponseStream())
				{
					using (StreamReader reader = new StreamReader(stream))
					{
						userData = reader.ReadToEnd();
					}
				}

				response.Close();
			}
			catch
			{
				userData = string.Empty;
			}

			if (string.IsNullOrEmpty(userData))
			{
				return false;
			}

			return true;
		}
	}
}
