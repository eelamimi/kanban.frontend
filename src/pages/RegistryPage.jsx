import RegistryForm from '../components/RegistryForm'
import { RegistryProvider } from '../context/Registry/RegistryProvider'

const RegistryPage = () => {
    return (
        <RegistryProvider>
            <RegistryForm />
        </RegistryProvider>
    )
}

export default RegistryPage
