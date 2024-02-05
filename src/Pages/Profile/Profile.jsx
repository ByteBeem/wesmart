import React, { Component } from "react";
import "./Profile.scss";
import "../../App.scss";
import axios from "axios";
import Sidebar from "../../components/Sidebar/Sidebar";

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchQuery: "",
      isLoading: false,
      videos: [],
      error: null,
    };
  }

  handleSearch = () => {
    const { searchQuery } = this.state;
    this.setState({ isLoading: true, videos: [], error: null });

    axios
      .get(
        `https://mainp-server-c7a5046a3a01.herokuapp.com/search/${encodeURIComponent(searchQuery)}`
      )
      .then((response) => {
        if (response.status === 200) {
          this.setState({ videos: response.data });
        } else if (response.status === 400) {
          this.setError('Oops!: Wrong Video ID.');
        } else if (response.status === 404) {
          this.setError('Oops!: Video not Found.');
        } else {
          this.setError('Oops!: Something went wrong. Try again.');
        }
      })
      .catch((err) => {
        this.setError('Sorry, did not find anything. Check later.');
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  };

  setError = (errorMessage) => {
    this.setState({ error: errorMessage });
  };

  render() {
    const { showSidebar, closeSidebar } = this.props;
    const { searchQuery, isLoading, videos, error } = this.state;

    return (
      <div className="profile">
        <Sidebar showSidebar={showSidebar} closeSidebar={closeSidebar} />
        <div className="profile-content">
          <div className="search-area">
            <input
              type="text"
              placeholder="Enter Requested Video ID here..."
              value={searchQuery}
              onChange={(e) => this.setState({ searchQuery: e.target.value })}
            />
            <button onClick={this.handleSearch} disabled={isLoading}>
              {isLoading ? "Searching..." : "Search"}
            </button>
          </div>

          {error && <div className="error-message">{error}</div>}
          <div className="videos_container">
            <div className="video-list">
              {Array.isArray(videos) ? (
                videos.map((video) => (
                  <div key={video.id} className="video_card">
                    <video
                      src={video.video}
                      controls={true}
                      autoPlay={false}
                      muted={false}
                      loop={true}
                    />
                  </div>
                ))
              ) : (
                <div key={videos.id} className="video_card">
                  <video
                    src={videos.video}
                    controls={true}
                    autoPlay={false}
                    muted={false}
                    loop={true}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
