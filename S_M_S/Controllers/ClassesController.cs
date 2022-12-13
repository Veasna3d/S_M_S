using S_M_S.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace S_M_S.Controllers
{
    public class ClassesController : Controller
    {

        private SchoolDBEntities db = new SchoolDBEntities();

        // GET: Classes
        public ActionResult Index()
        {
            return View();
        }
        public JsonResult GetAllData()
        {
            return new JsonResult { Data = db.Classes.ToList(), JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }
        //Insert
        public JsonResult Create(Class classes)
        {
            db.Classes.Add(classes);
            db.SaveChanges();
            return new JsonResult { Data = "Insert Success", JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }
        //get by id
        public JsonResult GetDataID(int? id)
        {
            Class Class = db.Classes.Find(id);
            return new JsonResult { Data = Class, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }
        //Update
        public JsonResult Edit(Class classes)
        {
            db.Entry(classes).State = System.Data.Entity.EntityState.Modified;
            db.SaveChanges();
            return new JsonResult { Data = "Update Success", JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }
        //Delete
        public JsonResult Delete(int id)
        {
            Class Class = db.Classes.Find(id);
            db.Classes.Remove(Class);
            db.SaveChanges();
            return new JsonResult { Data = "Delete Success", JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }
    }
}