package controllers

import lila.product.ProductRepo
import play.api.data._, Forms._
import play.api.i18n.Messages.Implicits._
import play.api.libs.concurrent.Promise
import play.api.libs.json._
import play.api.mvc._, Results._
import play.api.Play.current

import lila.api.Context
import lila.app._
import lila.common.{ LilaCookie, HTTPRequest }
import lila.user.{ UserRepo, User => UserModel }
import views._
import scala.concurrent.Future
import play.modules.reactivemongo.json.BSONFormats._
//import play.api.libs.concurrent.Execution.Implicits.defaultContext
import scala.concurrent.duration._

object API extends LilaController {

  def getGroup(name: String) = Open { implicit ctx =>
    Env.product.ILCached.getGroupListCached(name) map {
      list => Ok(Json.toJson(list))
    }
  }

  def getProduct(url: String) = Open { implicit ctx =>
    ProductRepo.getOneBySlug(url).map{
      product => Ok(Json.toJson(product))
    }
  }

  def getProducts(category: String) = Open { implicit ctx =>
    ProductRepo.getByCategory(category, 12).map {
      products => {
        Ok(Json.toJson(products))
      }
    }
  }

  def getProductsForIndex = Open { implicit  ctx =>
    val supIds = Env.product.cateCached.getListSupId.await
    val result = supIds.map{ item => {
        Json.obj("id" -> item, "value" -> ProductRepo.getByCategory(item, 12).map(products => Json.toJson(products)).await)
      }
    }
    Ok(Json.toJson(result)).fuccess
  }

}
