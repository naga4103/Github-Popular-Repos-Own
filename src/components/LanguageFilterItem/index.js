// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {eachData, activeId, onLanguageClicked} = props

  const listClassName =
    eachData.id === activeId
      ? 'on-active-list-class'
      : 'on-non-active-list-class'

  const onClickedListItem = () => {
    onLanguageClicked(eachData.id)
  }

  return (
    <button type="button" className={listClassName} onClick={onClickedListItem}>
      {eachData.language}
    </button>
  )
}

export default LanguageFilterItem
