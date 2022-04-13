using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Fines.Models;
using Fines.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Fines.Controllers
{
	public class HomeController : Controller
	{
		public FineService fineService = new FineService("mongodb://127.0.0.1:27017");

		public ActionResult Index()
		{
			ViewBag.Fines = fineService.GetAllFines();

			return View();
		}

		[HttpGet]
		public ActionResult Create()
		{
			return View("Create");
		}

		[HttpPost]
		[ValidateAntiForgeryToken]
		public async Task<ActionResult> CreateAsync(Fine fine)
		{
			Fine f = new Fine(fine);

			await fineService.Create(fine);

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
		public ActionResult Edit(int id)
		{
			return View("Edit");
		}

		[HttpPost]
		[ValidateAntiForgeryToken]
		public ActionResult Edit(Fine fine)
		{
			

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
		public ActionResult Delete(int id)
		{
			fines.RemoveAt(id);
			return View();
		}

		[HttpPost]
		[ValidateAntiForgeryToken]
		public ActionResult Delete(int id, IFormCollection collection)
		{
			try
			{
				return RedirectToAction(nameof(Index));
			}
			catch
			{
				return View();
			}
		}
	}
}
