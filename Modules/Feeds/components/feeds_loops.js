import moment from "moment";
import { abstractInfo } from "../../../Controller/Helpers.js"

import {
  listOfUserThatReactedToThisPost,
  listOfUserThatSharedToThisPost,
  userHasSharedThefeeds,
  userHasReactedToThisPost
} from "./reactions.js";
import {fetchUploadsUri} from './feeds_media.js'

const loops = async (uid, feeds,withoutToken) => {
  await Promise.all(
    feeds.map(async feed => {
      feed.timeago = moment(feed.created).fromNow();
      feed.userAbstractInfo = await abstractInfo(feed.uid_fk);
      feed.listOfUsersThatReactedToThisPost =await listOfUserThatReactedToThisPost(feed.feed_id)
      feed.listOfUsersThatSharedToThisPost = await listOfUserThatSharedToThisPost(feed.feed_id);
      if(!withoutToken) feed.userHasSharedThefeeds = await userHasSharedThefeeds(uid, feed.feed_id);
      if(!withoutToken) feed.userHasReactedToThisPost = await userHasReactedToThisPost(uid, feed.feed_id);
      // feed.fetchUploadsUri = await fetchUploadsUri(feed.uploads)
      return feed;
    })
  );

  return feeds;
};

export default loops;
