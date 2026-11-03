import CourseCard from './CourseCard'

const CourseList = ({ courses, allCourses, completed, getStatus, onToggle }) => {
  if (courses.length === 0) {
    return <p className="text-secondary">No courses to show in this view.</p>
  }

  return (
    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
      {courses.map((course) => (
        <div className="col" key={course.id}>
          <CourseCard
            course={course}
            allCourses={allCourses}
            status={getStatus(course)}
            isCompleted={completed.includes(course.id)}
            onToggle={onToggle}
          />
        </div>
      ))}
    </div>
  )
}

export default CourseList
