import { serve } from '@triframe/arbiter'
import path from 'path'

serve(path.resolve(__dirname, './models'), {
    session: {

    }
})