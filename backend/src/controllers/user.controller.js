import User from "../models/User.js";
import FriendRequest from "../models/FriendReq.js";

export async function getRecommendedUsers(req, res) {
  try {
    const currentUserId = req.user.id;

    /* --- MATCHMAKING LOGIC --- */

    /* 
    1. Fetch the full current user document to get their learningSkills 
    */

    const currentUser = await User.findById(currentUserId);

    if (!currentUser) {
      return res.status(404).json({ message: "Current user not found" });
    }
    
    /*
    2. If the user isn't learning any skills, we can't recommend anyone based on matches.
       You could return an empty array or fall back to another recommendation logic. 
    */

    if (!currentUser.learningSkills || currentUser.learningSkills.length === 0) {
      return res.status(200).json([]);
    }

    // 3. Find users who meet all criteria
    const recommendedUsers = await User.find({
      $and: [
        { _id: { $ne: currentUserId } }, // Exclude the current user
        { _id: { $nin: currentUser.friends } }, // Exclude existing friends
        { isOnboarded: true },

        /*
         The core matchmaking rule:
         Find users where their "gainedSkills" array contains at least one of
         the skills in the current user's "learningSkills" array. 
        */

        { gainedSkills: { $in: currentUser.learningSkills } },
      ],
    });

    res.status(200).json(recommendedUsers);
  } catch (error) {
    console.error("Error in getRecommendedUsers controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getMyFriends(req, res) {
  try {
    const user = await User.findById(req.user.id)
      .select("friends")
      .populate("friends", "fullName profilePic gainedSkills learningSkills bio");

    res.status(200).json(user.friends);
  } catch (error) {
    console.error("Error in getMyFriends controller", error.message);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

export async function sendFriendRequest(req, res) {
  try {
    const myId = req.user.id;
    const { id: recipientId } = req.params;

    // prevent sending req to yourself
    if (myId === recipientId) {
      return res.status(400).json({
        message: "You can't send friend  request to yourself",
      });
    }

    const recipient = await User.findById(recipientId);
    if (!recipient) {
      return res.status(404).json({
        message: "Recipient not found",
      });
    }

    // check if user is already friend
    if (recipient.friends.includes(myId)) {
      return res.status(400).json({
        message: "You are already friends with this user",
      });
    }

    // check if a req already exists
    const existingRequest = await FriendRequest.findOne({
      $or: [
        { sender: myId, recipient: recipientId },
        { sender: recipientId, recipient: myId },
      ],
    });

    if (existingRequest) {
      return res.status(400).json({
        message: "A friend request already exists between you and this user",
      });
    }

    const friendRequest = await FriendRequest.create({
      sender: myId,
      recipient: recipientId,
    });

    res.status(201).json(friendRequest);
  } catch (error) {
    console.log("Error in sendFriendRequest controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function acceptFriendRequest(req, res) {
     try {
        const {id: requestId} = req.params;

        const friendRequest = await FriendRequest.findById(requestId);

        if(!friendRequest) {
            return res.status(404).json({
                message: "Friend request not found "
            })
        }

        // verify the current user is the recipient
        if(friendRequest.recipient.toString() !== req.user.id) {
          return res.status(403).json({
            message: "You are not authorized to accept this request"
          });
        }

        friendRequest.status = "accepted";
        await friendRequest.save();

        // add each user to the other's friends array
        // $addToSet: adds elements to an array only if they do not already exists.

        await User.findByIdAndUpdate(friendRequest.sender, {
          $addToSet: {friends: friendRequest.recipient},
        });

        await User.findByIdAndUpdate(friendRequest.recipient, {
          $addToSet: {friends: friendRequest.sender},
        });

        res.status(200).json({
          message: "Friend request accepted"
        });
        
     } catch (error) {
        console.log("Error in acceptFriendRequest controller", error.message);
        res.status(500).json({
          message: "Internal Server Error"
        });
     }
}

export async function getFriendRequests(req, res) {
  try {
    const incomingReqs = await FriendRequest.find({
      recipient: req.user.id,
      status: "pending"
    }).populate("sender", "fullName profilePic gainedSkills learningSkills");

    const acceptedReqs = await FriendRequest.find({
      sender: req.user.id,
      status: "accepted",
    }).populate("recipient", "fullName profilePic");

    res.status(200).json({ incomingReqs, acceptedReqs });

  } catch (error) {
    console.log("Error in getPendingFriendRequests controller", error.message);
    res.status(500).json({message: "Internal Server Error"});
  }
}

export async function getOutgoingFriendReqs(req, res) {
  try {
    const outgoingRequests = await FriendRequest.find({
      sender: req.user.id,
      status: "pending",
    }).populate("recipient", "fullName profilePic gainedSkills learningSkills");

    res.status(200).json(outgoingRequests);

  } catch (error) {
    console.log("Error in getOutgoingFriendReqs controller", error.message);
    res.status(500).json({
      message: "Internal Server Error"
    }); 
  }
  
}