export default function QuizHeader({ employee }) {
    return (
        <div className="mb-6 text-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Kuis Keamanan Siber
            </h1>
            <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
                Penilaian Kesadaran Keamanan Informasi
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
                <span className="font-medium">{employee.name}</span>
            </p>
        </div>
    );
}
