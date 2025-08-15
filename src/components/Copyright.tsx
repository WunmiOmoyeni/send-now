export default function Copyright() {
    return(
        <div className="max-w-7xl mx-[100px] px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className= "text-sm text-[17px]">
              © 2025 SendNow. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <a
                href="#"
                className="hover:text-white transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className=" hover:text-white transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
    )
}
