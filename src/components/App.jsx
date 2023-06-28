import { useState, useEffect } from "react";
import { Searchbar } from "./Searchbar/Searchbar";
import { BtnLoad } from "components/Button/Button.styled";
import { PixabayAPI } from "components/service/image-pixabay";
import { Grid } from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import css from './Loader/Loader.module.css';
import { ModalWindow } from "components/Modal/Modal";
import { RemoveScroll } from 'react-remove-scroll';
import { ImageGallery } from "./ImageGallery/ImageGallery";

const pixabayApi = new PixabayAPI();

export const App = () => {

  const [data, setData] = useState([]);
  const [query, setQuery] = useState('');
  const [largeImageURL, setLargeImageURL] = useState('');
  const [tags, setTags] = useState('');
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isShowBtn, setIsShowBtn] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getImages(query, page);
  }, [query, page])

  const getImages = (query, page) => {
    if (query === '') {
      return;
    }
    setIsLoading(true);
      pixabayApi.getPhotoByQuery(query, page)
          .then(({ data: { totalHits, hits } }) => {
            if (!hits.length) {
              return toast(`No photos were found for your query`);
            }
            if (page === 1) { toast(`Your query has been found ${totalHits} image`) };
            setData(prevState => ([...prevState, ...hits]));
            setIsShowBtn(page < Math.ceil(totalHits / pixabayApi.per_page)) 
          })
          .catch(error => setError(error.message))
        .finally(() => setIsLoading(false));
    }

  const formData = inputData => {
    setQuery(inputData)
    setPage(1)
    setData([])
    setError(null)
    setIsShowBtn(false);
  }

  const handleClickBtn = () => {
        setPage(prevState => prevState +1)
  }

  const toggleModal = () => {
        setShowModal(prevState => !prevState )
  };

  const handleModal = event => {
    const { localName, parentNode } = event.target
    if (localName === 'img' && parentNode.localName === 'li') {
      let i = data.findIndex(({webformatURL}) => (
        webformatURL === event.target.src
      ));
      setLargeImageURL(data[i].largeImageURL);
      setTags(data[i].tags);
      toggleModal();
    }
  }

  return (
      <div
        className={css.App}
        onClick={handleModal}
      >
        <Searchbar onSubmit={formData} />
        
        <ImageGallery data={data} />

        <Grid
          height="80"
          width="80"
          color="#3bbcfd"
          ariaLabel="grid-loading"
          radius="12.5"
          visible={isLoading}
          wrapperStyle={{marginLeft: "auto", marginRight: "auto"}}
        />
        {isShowBtn && (<BtnLoad onClick={handleClickBtn}>Load more</BtnLoad>)}
        <ToastContainer />
        
        {showModal && (<RemoveScroll>
          <ModalWindow
            onClose={toggleModal}
            showModal={showModal}
          >
                <img src={largeImageURL} alt={tags}/>
              </ModalWindow>
            </RemoveScroll>)}
        
      </div>
    )

}