package team.web.domain;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ScheduleRepository extends JpaRepository<Schedule, Long> {

    List<Schedule> findByMemberId(Long memberId);
    Schedule findScheduleById(Long scheduleId);

}