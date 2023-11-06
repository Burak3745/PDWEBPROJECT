

const movieReducer = (movie = [], action) => {
  switch (action.type) {
    case "GET_MOVIE":
      return action.payload

    case "GET_USER":
      return action.payload

    case "GET_ID_MOVIE":
      return movie.filter((item) => item._id !== action.payload)
      
    case "CREATE_MOVIE":
      return [...movie, action.payload]

    case "UPDATE_MOVIE":
      return movie.map((item) =>
        item._id === action.payload._id ? action.payload : item
      )

    case "UPDATE_USER":
      return movie.map((item) =>
        item._id === action.payload._id ? action.payload : item
      )
    case "DELETE_MOVIE":
      return movie.filter((item) => item._id !== action.payload)

    default:
      return movie
  }
}

export default movieReducer;