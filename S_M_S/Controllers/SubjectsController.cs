using S_M_S.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace S_M_S.Controllers
{
    public class SubjectsController : Controller
    {
        // GET: Subjects
        private SchoolDBEntities db = new SchoolDBEntities();

        public ActionResult Index()
        {
            return View();
        }
        public JsonResult GetAllData()
        {
            return new JsonResult { Data = db.Subjects.ToList(), JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }
        //Insert
        public JsonResult Create(Subject subject)
        {
            db.Subjects.Add(subject);
            db.SaveChanges();
            return new JsonResult { Data = "Insert Success", JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }
        //get by id
        public JsonResult GetDataID(int? id)
        {
            Subject Subject = db.Subjects.Find(id);
            return new JsonResult { Data = Subject, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }
        //Update
        public JsonResult Edit(Subject subject)
        {
            db.Entry(subject).State = System.Data.Entity.EntityState.Modified;
            db.SaveChanges();
            return new JsonResult { Data = "Update Success", JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }
        //Delete
        public JsonResult Delete(int id)
        {
            Subject Subject = db.Subjects.Find(id);
            db.Subjects.Remove(Subject);
            db.SaveChanges();
            return new JsonResult { Data = "Delete Success", JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }
    }
}