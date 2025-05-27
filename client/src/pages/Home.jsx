import { motion, AnimatePresence } from 'framer-motion'
import { useSnapshot } from 'valtio'
import state from '../store'
import { CustomButton } from '../components'
import {
    headContainerAnimation,
    headContentAnimation,
    headTextAnimation,
    slideAnimation,
} from '../config/motion'

const Home = () => {
    const snap = useSnapshot(state)

    return (
        <AnimatePresence>
            {snap.intro && (
                <motion.section
                    className="home min-h-screen flex flex-col justify-between items-center px-6 sm:px-12 py-10 bg-gradient-to-tr from-[#0f2027] via-[#203a43] to-[#2c5364] text-white"
                    {...slideAnimation('left')}
                >
                    <motion.header className="w-full flex justify-between items-center">
                        <img
                            src="./logo.png"
                            alt="logo"
                            className="w-24 h-24 object-contain"
                        />
                        <span className="text-sm text-gray-300 uppercase tracking-widest">Customize Hub</span>
                    </motion.header>

                    <motion.div
                        className="flex-1 flex flex-col justify-center items-center gap-8 text-center"
                        {...headContainerAnimation}
                    >
                        <motion.div {...headTextAnimation}>
                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight drop-shadow-xl">
                                CREATE <br className="hidden md:block" /> YOUR STYLE
                            </h1>
                        </motion.div>

                        <motion.div
                            {...headContentAnimation}
                            className="flex flex-col gap-6 items-center max-w-2xl"
                        >
                            <p className="text-base sm:text-lg text-gray-300">
                                Unleash your imagination and customize your design experience with ease and creativity. Build your brand, style, or idea in just a few clicks.
                            </p>

                            <CustomButton
                                type="filled"
                                title="Start Customizing"
                                handleClick={() => (state.intro = false)}
                                customStyles="px-8 py-3 bg-white text-black font-semibold rounded-full shadow-lg hover:bg-gray-200 transition-all duration-300"
                            />
                        </motion.div>
                    </motion.div>

                </motion.section>
            )}
        </AnimatePresence>
    )
}

export default Home
