// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {eachRepo} = props

  return (
    <li className="repo-container">
      <img alt={eachRepo.name} className="repo-logo" src={eachRepo.avatarUrl} />
      <h1 className="heading">{eachRepo.name}</h1>
      <div className="row-container">
        <img
          alt="stars"
          className="para-logo"
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
        />
        <p className="para">{eachRepo.starsCount}</p>
        <p className="para">stars</p>
      </div>
      <div className="row-container">
        <img
          alt="forks"
          className="para-logo"
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
        />
        <p className="para">{eachRepo.forksCount}</p>
        <p className="para">forks</p>
      </div>
      <div className="row-container">
        <img
          alt="open issues"
          className="para-logo"
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
        />
        <p className="para">{eachRepo.issuesCount}</p>
        <p className="para">open issues</p>
      </div>
    </li>
  )
}

export default RepositoryItem
