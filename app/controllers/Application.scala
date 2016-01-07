package controllers

import lila.app._
import lila.hub.actorApi.{GetUserIds, GetUids}
import lila.user.{ Cached, UserRepo, User => UserModel }
import play.api._
import play.api.data.Form
import play.api.data.Forms._
import play.api.http.ContentTypes
import play.api.libs.json.{JsString, JsArray, JsObject, Json}
import play.api.mvc._
import views.html.helper.form
import scala.annotation.tailrec
import scala.concurrent.Future
import com.ybrikman.ping.javaapi.bigpipe.PageletRenderOptions
import com.ybrikman.ping.scalaapi.bigpipe._
import com.ybrikman.ping.scalaapi.bigpipe.HtmlStreamImplicits._

import com.ybrikman.ping.javaapi.bigpipe.PageletRenderOptions._
import scala.concurrent.ExecutionContext
import lila.product.{DataForm, ProductRepo, InfoListRepo, CategoryRepo}
import play.modules.reactivemongo.json.BSONFormats._


object Application extends LilaController{

  private def env = lila.app.Env.current

  def index = Action.async {
    val supIds = Env.product.cateCached.getListSupId.await
    val products = supIds.map{ item => {
      Json.obj("id" -> item, "value" -> ProductRepo.getByCategory(item, 12).map(products => Json.toJson(products)).await)
      }
    }
    val allCategorys = CategoryRepo.getAllCategory().await.toString
    lila.setup.Env.current.setupRepo.get("listMenu").map {
      data => {
        val arr = (data\"v").as[JsArray].toString
        Ok(views.html.index.index(arr, allCategorys, Json.toJson(products).toString))
      }
    }
  }

  def product(slug: String) = Action.async {
    val product = ProductRepo.getOneBySlug(slug).map(Json.toJson(_)).await.toString
    val allCategorys = CategoryRepo.getAllCategory().await.toString
    lila.setup.Env.current.setupRepo.get("listMenu").map {
      data => {
        val arr = (data\"v").as[JsArray].toString
        Ok(views.html.index.product(arr, allCategorys, product))
      }
    }
  }

  def category(slug: String, slug2: String, slug3: String) = Action.async {
    val products = ProductRepo.getByCategory("arduino", 12).map(Json.toJson(_)).await.toString
    val allCategorys = CategoryRepo.getAllCategory().await.toString
    lila.setup.Env.current.setupRepo.get("listMenu").map {
      data => {
        val arr = (data\"v").as[JsArray].toString
        Ok(views.html.index.category(arr, allCategorys, products))
      }
    }
  }

}



