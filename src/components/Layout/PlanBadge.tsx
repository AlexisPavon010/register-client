import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import cs from 'classnames'
import { BiUser, BiUserPlus } from 'react-icons/bi'
import { IoCaretDownCircleOutline } from 'react-icons/io5'


const PlanBadge = () => {
  const { active } = useSelector( (state: any) => state.workspace );
  // const planName = get(active, 'planID.name', '')
  // const isPro = planName === 'Pro'

  return (
    <Link to="/plans">
      <div>
        {true ? (
          <IoCaretDownCircleOutline color="#3F4D70" />
        ) : (
          <BiUserPlus size={16} />
        )}
        Plan {'asdasd'}
      </div>
    </Link>
  )
}

export default PlanBadge
