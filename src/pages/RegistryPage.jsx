import RegistryForm from '../components/RegistryForm'
import { RegistryProvider } from '../context/Registry/RegistryContext'

const RegistryPage = () => {
    return (
        <RegistryProvider>
            <RegistryForm />
        </RegistryProvider>
    )
}

export default RegistryPage
