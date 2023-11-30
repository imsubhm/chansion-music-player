import React, { useState, useEffect } from "react";

import { AiFillPlayCircle } from "react-icons/ai";
import "./library.css";
import { useNavigate } from "react-router-dom";
import apiGetCall from "../../Api";

export default function Library() {
  const [playlists, setPlaylists] = useState();

  useEffect(() => {
    apiGetCall.get("/me/playlists?limit=40&offset=0").then(function (response) {
      setPlaylists(response.data.items);
    });
  }, []);

  const navigate = useNavigate();

  const playPlaylist = (id) => {
    navigate("/player", { state: { id: id } });
  };

  return (
    <div className="screen-container">
      <div className="library-body">
        {playlists?.map((playlist) => (
          <div
            className="playlist-card"
            key={playlist.id}
            onClick={() => playPlaylist(playlist.id)}
          >
            <img
              src={playlist?.images[0]?.url}
              className="playlist-image"
              alt="Playlist-Art"
            />
            <p className="playlist-title">{playlist?.name}</p>
            <p className="playlist-subtitle">{playlist?.tracks?.total} Songs</p>
            <div className="playlist-fade">
              <AiFillPlayCircle className="playlist-play-btn" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
