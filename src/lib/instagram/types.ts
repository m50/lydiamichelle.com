/* eslint-disable camelcase */
export interface InstagramResponse {
  data: Data;
  status: string;
}
export interface Data {
  user: User;
}
export interface User {
  edge_owner_to_timeline_media: EdgeOwnerToTimelineMedia;
}
export interface EdgeOwnerToTimelineMedia {
  count: number;
  page_info: PageInfo;
  edges?: (EdgesEntity)[] | null;
}
export interface PageInfo {
  has_next_page: boolean;
  end_cursor: string;
}
export interface EdgesEntity {
  node: Node;
}
export interface Node {
  __typename: string;
  id: string;
  gating_info?: null;
  fact_check_overall_rating?: null;
  fact_check_information?: null;
  media_overlay_info?: null;
  sensitivity_friction_info?: null;
  sharing_friction_info: SharingFrictionInfo;
  dimensions: Dimensions;
  display_url: string;
  display_resources?: (DisplayResourcesEntityOrThumbnailResourcesEntity)[] | null;
  is_video: boolean;
  media_preview?: string | null;
  tracking_token: string;
  edge_media_to_tagged_user: EdgeMediaToTaggedUserOrEdgeMediaToSponsorUser;
  accessibility_caption?: null;
  edge_media_to_caption: EdgeMediaToCaption;
  shortcode: string;
  edge_media_to_comment: EdgeMediaToComment;
  edge_media_to_sponsor_user: EdgeMediaToTaggedUserOrEdgeMediaToSponsorUser;
  comments_disabled: boolean;
  taken_at_timestamp: number;
  edge_media_preview_like: EdgeMediaPreviewLike;
  owner: Owner;
  location?: Location | null;
  viewer_has_liked: boolean;
  viewer_has_saved: boolean;
  viewer_has_saved_to_collection: boolean;
  viewer_in_photo_of_you: boolean;
  viewer_can_reshare: boolean;
  thumbnail_src: string;
  thumbnail_resources?: (DisplayResourcesEntityOrThumbnailResourcesEntity)[] | null;
  edge_sidecar_to_children?: EdgeSidecarToChildren | null;
  dash_info?: DashInfo | null;
  has_audio?: boolean | null;
  video_url?: string | null;
  video_view_count?: number | null;
  product_type?: string | null;
}
export interface SharingFrictionInfo {
  should_have_sharing_friction: boolean;
  bloks_app_url?: null;
}
export interface Dimensions {
  height: number;
  width: number;
}
export interface DisplayResourcesEntityOrThumbnailResourcesEntity {
  src: string;
  config_width: number;
  config_height: number;
}
export interface EdgeMediaToTaggedUserOrEdgeMediaToSponsorUser {
  edges?: (null)[] | null;
}
export interface EdgeMediaToCaption {
  edges?: (EdgesEntity1)[] | null;
}
export interface EdgesEntity1 {
  node: Node1;
}
export interface Node1 {
  text: string;
}
export interface EdgeMediaToComment {
  count: number;
  page_info: PageInfo1;
}
export interface PageInfo1 {
  has_next_page: boolean;
  end_cursor?: string | null;
}
export interface EdgeMediaPreviewLike {
  count: number;
  edges?: (EdgesEntity2)[] | null;
}
export interface EdgesEntity2 {
  node: Node2;
}
export interface Node2 {
  id: string;
  profile_pic_url: string;
  username: string;
}
export interface Owner {
  id: string;
  username: string;
}
export interface Location {
  id: string;
  has_public_page: boolean;
  name: string;
  slug: string;
}
export interface EdgeSidecarToChildren {
  edges?: (EdgesEntity3)[] | null;
}
export interface EdgesEntity3 {
  node: Node3;
}
export interface Node3 {
  __typename: string;
  id: string;
  gating_info?: null;
  fact_check_overall_rating?: null;
  fact_check_information?: null;
  media_overlay_info?: null;
  sensitivity_friction_info?: null;
  sharing_friction_info: SharingFrictionInfo;
  dimensions: Dimensions;
  display_url: string;
  display_resources?: (DisplayResourcesEntityOrThumbnailResourcesEntity)[] | null;
  is_video: boolean;
  media_preview: string;
  tracking_token: string;
  edge_media_to_tagged_user: EdgeMediaToTaggedUserOrEdgeMediaToSponsorUser;
  accessibility_caption?: null;
}
export interface DashInfo {
  is_dash_eligible: boolean;
  video_dash_manifest: string;
  number_of_qualities: number;
}
