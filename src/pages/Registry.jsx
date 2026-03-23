import RegistryForm from '../components/RegistryForm'
import { RegistryProvider } from '../context/Registry/RegistryProvider'

const Registry = () => {
    return (
        <RegistryProvider>
            <RegistryForm />
        </RegistryProvider>
    )
}

export default Registry
