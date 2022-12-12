using S_M_S.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace S_M_S.Controllers
{
    public class TeachersController : Controller
    {
        // GET: Teachers
        private SchoolDBEntities db = new SchoolDBEntities();
        public ActionResult Index()
        {
            return View();
        }
        //GetAllData
        public JsonResult GetAllData()
        {
            return new JsonResult { Data = db.Teachers.ToList(), JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }
        //Insert
        public JsonResult Create(Teacher teacher)
        {
            //Upload Image
            if (Request.Files.Count > 0)
            {
                var file = Request.Files[0];
                if (file != null && file.ContentLength > 0)
                {
                    var filename = Path.GetFileName(file.FileName);
                    var path = Path.Combine(Server.MapPath("~/Images/"), filename);
                    teacher.Image = filename;
                    file.SaveAs(path);
                }
            }
            db.Teachers.Add(teacher);
            db.SaveChanges();
            return new JsonResult { Data = "Insert Success", JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }
        //get by id
        public JsonResult GetDataID(int? id)
        {
            Teacher teacher = db.Teachers.Find(id);
            return new JsonResult { Data = teacher, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }
        //Update
        public JsonResult Edit(Teacher teacher)
        {
            if (Request.Files.Count > 0)
            {
                var file = Request.Files[0];
                if (file != null && file.ContentLength > 0)
                {
                    var filename = Path.GetFileName(file.FileName);
                    var path = Path.Combine(Server.MapPath("~/Images/"), filename);
                    teacher.Image = filename;
                    file.SaveAs(path);
                    db.Entry(teacher).State = EntityState.Modified;
                    db.SaveChanges();
                }
            }
            else
            {
                //double check
                db.Entry(teacher).State = EntityState.Modified;
                db.Entry(teacher).Property(x => x.Image).IsModified = false;
                db.SaveChanges();
            }
            return new JsonResult { Data = "Update Success", JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }
        //Delete
        public JsonResult Delete(int id)
        {
            Teacher teacher = db.Teachers.Find(id);
            db.Teachers.Remove(teacher);
            db.SaveChanges();
            return new JsonResult { Data = "Delete Success", JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }
    }
}