import galaxy from "/src/data/images/galaxy.jpg";
import { Profile } from "@/types/profile";

function ProfileContent({
  fullName,
  location,
  studentId,
  dateOfBirth,
  phoneNumber,
  email,
  role,
  photo,
}: Profile) {
  const formatDate = (date: Date) => {
    const dateString = String(date);
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  };

  return (
    <section className="w-full overflow-hidden dark:bg-gray-900">
      <div className="flex flex-col">
        <img
          src={galaxy}
          alt="User Cover"
          className="xs:h-[11rem] w-full object-cover object-center sm:h-[14rem] md:h-[16rem] lg:h-[18rem] xl:h-[20rem]"
        />

        <div className="xs:w-[90%] mx-auto flex flex-col sm:w-[80%] sm:flex-row">
          <img
            src={photo}
            alt="User Profile"
            className="xs:w-[7rem] xs:h-[7rem] xs:bottom-[3rem] relative rounded-md outline outline-2 outline-offset-2 outline-blue-500 sm:bottom-[4rem] sm:h-[8rem] sm:w-[8rem] md:h-[10rem] md:w-[10rem] lg:bottom-[5rem] lg:h-[12rem] lg:w-[12rem]"
          />

          <h1 className="xs:pl-4 xs:text-2xl my-4 mb-0 w-full px-5 text-left text-[24px] font-bold text-gray-800 dark:text-white sm:mx-4 sm:text-3xl md:text-3xl lg:text-4xl">
            {fullName}
          </h1>
        </div>

        <div className="xs:w-[90%] xs:-top-4 relative mx-auto mt-[20px] flex flex-col items-center gap-4 px-5 sm:-top-4 sm:w-[92%] md:-top-6 md:w-[90%] lg:-top-8 lg:w-[90%] xl:w-[80%]">
          <p className="w-fit text-gray-700 dark:text-gray-400 md:text-[18px]">
            {fullName} adalah mahasiswa Binus University Jakarta angkatan 27
            jurusan Computer Science. Berdomisili di {location}, ia memiliki
            minat dalam pengembangan teknologi dan informatika. Dengan peran
            sebagai {role}, ia terus mengejar keunggulan dalam pendidikan dan
            karier di masa depan.
          </p>

          <div className="my-auto flex w-full flex-col justify-center gap-2 py-6">
            <div className="flex w-full flex-col justify-center gap-2 md:flex-row">
              <div className="w-full">
                <dl className="divide-y divide-gray-200 text-gray-900 dark:divide-gray-700 dark:text-white">
                  <div className="flex flex-col pb-3">
                    <dt className="mb-1 text-gray-500 dark:text-gray-400 md:text-lg">
                      Full Name
                    </dt>
                    <dd className="text-lg font-semibold">{fullName}</dd>
                  </div>
                  <div className="flex flex-col py-3">
                    <dt className="mb-1 text-gray-500 dark:text-gray-400 md:text-lg">
                      Date Of Birth
                    </dt>
                    <dd className="text-lg font-semibold">
                      {formatDate(dateOfBirth)}
                    </dd>
                  </div>
                  <div className="flex flex-col py-3">
                    <dt className="mb-1 text-gray-500 dark:text-gray-400 md:text-lg">
                      Location
                    </dt>
                    <dd className="text-lg font-semibold">{location}</dd>
                  </div>
                </dl>
              </div>
              <div className="w-full">
                <dl className="divide-y divide-gray-200 text-gray-900 dark:divide-gray-700 dark:text-white">
                  <div className="flex flex-col pb-3">
                    <dt className="mb-1 text-gray-500 dark:text-gray-400 md:text-lg">
                      Student ID
                    </dt>
                    <dd className="text-lg font-semibold">{studentId}</dd>
                  </div>

                  <div className="flex flex-col py-3">
                    <dt className="mb-1 text-gray-500 dark:text-gray-400 md:text-lg">
                      Phone Number
                    </dt>
                    <dd className="text-lg font-semibold">
                      {formatPhoneNumber(phoneNumber)}
                    </dd>
                  </div>
                  <div className="flex flex-col pt-3">
                    <dt className="mb-1 text-gray-500 dark:text-gray-400 md:text-lg">
                      Email
                    </dt>
                    <dd className="text-lg font-semibold">{email}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function formatPhoneNumber(phoneNum: string): string {
  const countryCode = "+62";

  if (phoneNum.length === 0) {
    return `${countryCode} ${phoneNum}`;
  }

  const formattedNumber = phoneNum
    .replace(/^0/, "")
    .replace(/(\d{3})(\d{4})(\d{4})/, "$1 $2 $3");
  return `${countryCode} ${formattedNumber}`;
}

export default ProfileContent;
