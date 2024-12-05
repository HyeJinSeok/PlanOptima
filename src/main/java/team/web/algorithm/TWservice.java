package team.web.algorithm;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import team.web.domain.ScheduleRepository;
import team.web.member.MemberRepository;

@Service
public class TWservice {

    private final TaskTypeRepository taskTypeRepository;
    private final ScheduleRepository scheduleRepository;
    private final MemberRepository memberRepository;

    @Autowired
    public TWservice(TaskTypeRepository taskTypeRepository, ScheduleRepository scheduleRepository, MemberRepository memberRepository) {
        this.taskTypeRepository = taskTypeRepository;
        this.scheduleRepository = scheduleRepository;
        this.memberRepository = memberRepository;
    }

}