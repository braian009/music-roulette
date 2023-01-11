const extractData = (items) => {
    return items.map((item) => ({
      image: item.track.album.images[1].url,
      title: item.track.name,
      artist: item.track.artists[0].name,
      url: item.track.external_urls.spotify,
    }));
  };

  export default extractData;