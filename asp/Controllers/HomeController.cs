using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Fines.Models;
using Fines.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Bson;

namespace Fines.Controllers
{
	public class HomeController : Controller
	{
		public FineService fineService = new FineService();

		public async Task<ActionResult> Index()
		{
			List<Fine> fines = new List<Fine>();

			fines = await fineService.GetAllFines();
			ViewBag.Fines = fines;

			return View();
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
				return View();
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
				return View();
			}
		}

		[HttpGet]
		public async Task<ActionResult> Delete(string id)
		{
			await fineService.Remove(id);

			return RedirectToAction(nameof(Index));
		}
	}
}
