using S_M_S.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MVC_School.Controllers
{
    public class SessionsController : Controller
    {
        private SchoolDBEntities db = new SchoolDBEntities();
        // GET: Sessions
        public ActionResult Index()
        {
            return View();
        }
        public JsonResult GetAllData()
        {
            return new JsonResult { Data = db.Sessions.ToList(), JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }
        //Insert
        public JsonResult Create(Session session)
        {
            db.Sessions.Add(session);
            db.SaveChanges();
            return new JsonResult { Data = "Insert Success", JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }
        //get by id
        public JsonResult GetDataID(int? id)
        {
            Session Session = db.Sessions.Find(id);
            return new JsonResult { Data = Session, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }
        //Update
        public JsonResult Edit(Session session)
        {
            db.Entry(session).State = System.Data.Entity.EntityState.Modified;
            db.SaveChanges();
            return new JsonResult { Data = "Update Success", JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }
        //Delete
        public JsonResult Delete(int id)
        {
            Session Session = db.Sessions.Find(id);
            db.Sessions.Remove(Session);
            db.SaveChanges();
            return new JsonResult { Data = "Delete Success", JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }
    }
}