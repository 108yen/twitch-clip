export type User = {
    id: string;
    login: string | undefined;
    display_name: string | undefined;
    type: string | undefined;
    broadcaster_type: string | undefined;
    description: string | undefined;
    profile_image_url: string | undefined;
    offline_image_url: string | undefined;
    view_count: number | undefined;
    created_at: string | undefined;
    follower_num: number | undefined;
}

export type Clip = {
    id: string;
    url: string;
    embed_url: string;
    broadcaster_id: string;
    broadcaster_name: string;
    creator_id: string;
    creator_name: string;
    video_id: string;
    game_id: string;
    language: string;
    title: string;
    view_count: number;
    created_at: string;
    thumbnail_url: string;
    duration: number;
    vod_offset: number;
}

export type ClipDoc = {
    [key: string]: Array<Clip>;
}