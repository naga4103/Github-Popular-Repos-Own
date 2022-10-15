import {Component} from 'react'

import Loader from 'react-loader-spinner'

import LanguageFilterItem from '../LanguageFilterItem'

import RepositoryItem from '../RepositoryItem'

import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]
const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}
// Write your code here
class GithubPopularRepos extends Component {
  state = {
    activeId: languageFiltersData[0].id,
    repoList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getProducts()
  }

  onLanguageClicked = activeId => {
    this.setState({activeId}, this.getProducts)
  }

  getProducts = async () => {
    console.log('hii')
    const {activeId} = this.state
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const apiUrl = `https://apis.ccbp.in/popular-repos?language=${activeId}`
    const response = await fetch(apiUrl)
    if (response.ok === true) {
      const fetchedData = await response.json()
      console.log(fetchedData)
      const repositoriesList = fetchedData.popular_repos.map(eachData => ({
        name: eachData.name,
        id: eachData.id,
        issuesCount: eachData.issues_count,
        forksCount: eachData.forks_count,
        starsCount: eachData.stars_count,
        avatarUrl: eachData.avatar_url,
      }))
      console.log(repositoriesList)
      this.setState({
        repoList: repositoriesList,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderSuccessView = () => {
    const {repoList} = this.state

    return (
      <ul className="repo-list-container">
        {repoList.map(eachRepo => (
          <RepositoryItem eachRepo={eachRepo} key={eachRepo.id} />
        ))}
      </ul>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderFailureView = () => (
    <img
      alt="failure view"
      className="failure-view"
      src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
    />
  )

  renderAllViews = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const {activeId} = this.state
    return (
      <div className="app-container">
        <div className="responsive-container">
          <h1 className="heading-main">Popular</h1>
          <div className="header-container">
            {languageFiltersData.map(eachData => (
              <LanguageFilterItem
                eachData={eachData}
                key={eachData.id}
                activeId={activeId}
                onLanguageClicked={this.onLanguageClicked}
              />
            ))}
          </div>
          {this.renderAllViews()}
        </div>
      </div>
    )
  }
}
export default GithubPopularRepos
