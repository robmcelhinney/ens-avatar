export default function GridGallery({ images, setImageObject}) {

    const GridGalleryCard = ({ imageObject }) => {
        return (
              <div className="w-full rounded hover:shadow-2xl">
                  <img src={imageObject.image} alt="" 
                        onClick={() => selectObject(imageObject)}
                  />
              </div>
        )
    }

    const selectObject = async (imageObject) => {
        setImageObject(imageObject)
    }

  return (
    <div className="container mx-auto space-y-2 lg:space-y-0 lg:gap-2 lg:grid lg:grid-cols-3">
        {images &&
            images.map((imageObject, _) => (
            <GridGalleryCard
                imageObject={imageObject}
                key={imageObject.token_uri}
            />
            ))
        }
    </div>
  )
}
