# SPDX-License-Identifier: MIT
# @version ^0.3.0

"""
@title A decentralized anonymous BBS
@license MIT
@author komaeka
@dev
    post_title The title of post
    post_content The content of post
    picture_hash The picture CID in IPFS
    comment All comments in the post
    post_position Can be understood as the post id
    comment_position The comment position in the post
"""

struct post_struct:
    post_title: String[90]
    post_content: String[300]
    post_position: uint8
    publish_time: uint256
    picture_hash: String[46]
    comment: DynArray[String[300], 100]
    comment_position: uint8

struct post_title_struct:
    post_title: String[90]
    post_position: uint8
    publish_time: uint256

posts: post_struct[100]
post_sign: uint8

# publis post
@external
def publish_post(_post_title: String[90], _post_content: String[300], _publish_time: uint256,  _picture_hash: String[46]):
    post_sign: uint8 = self.post_sign
    self.posts[post_sign].post_title = _post_title
    self.posts[post_sign].post_content = _post_content
    self.posts[post_sign].post_position = post_sign
    self.posts[post_sign].publish_time = _publish_time
    self.posts[post_sign].picture_hash = _picture_hash
    self.posts[post_sign].comment = empty(DynArray[String[300], 100])
    self.posts[post_sign].comment_position = 0
    # when there are 100 posts, recompute post_sign
    if post_sign == 99:
        self.post_sign = 0
    else:
        self.post_sign += 1

# publish comment
@external
def publish_comment(_comment: String[300], _post_position: uint8):
    # when there are 100 comments, refuse
    comment_position: uint8 = self.posts[_post_position].comment_position
    if comment_position > 99:
        raise "Comments already been full!"
    self.posts[_post_position].comment.append(_comment)
    self.posts[_post_position].comment_position += 1

# get posts titles
@view
@external
def get_posts_titles() -> post_title_struct[100]:
    post_title_struct_array: post_title_struct[100] = empty(post_title_struct[100])
    post_title_struct_array_index: uint8 = 0
    for item in self.posts:
        post_title_struct_array[post_title_struct_array_index].post_title = item.post_title
        post_title_struct_array[post_title_struct_array_index].post_position = item.post_position
        post_title_struct_array[post_title_struct_array_index].publish_time = item.publish_time
        post_title_struct_array_index += 1
    return post_title_struct_array

# get post content
@view
@external
def get_post_object(_post_position: uint8) -> (String[90], String[300], String[46], DynArray[String[300], 100]):
    post_title: String[90] = self.posts[_post_position].post_title
    post_content: String[300] = self.posts[_post_position].post_content
    picture_hash: String[46] = self.posts[_post_position].picture_hash
    comment: DynArray[String[300], 100] = self.posts[_post_position].comment
    return (post_title, post_content, picture_hash, comment)