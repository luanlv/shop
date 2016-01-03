package lila.product

import scala.concurrent.duration._

import org.joda.time.DateTime
import play.api.libs.json.JsObject
import reactivemongo.bson._

import spray.caching.{ LruCache, Cache }

import lila.common.LightUser
import lila.db.api.{ $count, $primitive }
import lila.db.BSON._
import lila.db.Implicits._
import lila.memo.{ ExpireSetMemo, MongoCache }
import tube.productTube

final class Cached(
                      nbTtl: FiniteDuration,
                      mongoCache: MongoCache.Builder) {

  private def oneWeekAgo = DateTime.now minusWeeks 1

  private val cache: Cache[List[Product]] = LruCache(timeToLive = 5 minute)

  def clearCache = fuccess(cache.clear)

  private implicit val productHandler = Product.productBSONHandler

  def test(text: String): Fu[List[Product]] = cache(true) {
    val delay1 = 2
    val result = productTube.coll.find(BSONDocument("info.stock" -> 0))
        .cursor[Product]().collect[List](3)
    import scala.concurrent.duration._
    import play.api.libs.concurrent.Promise

    val futureProduct =  Promise.timeout(result, delay1.second).flatMap(x => x)
    futureProduct
  }
}