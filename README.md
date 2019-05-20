# todolist
- my_first_todo_list

# 설치 환경
- aws ec2
- Ubuntu Server 18.04 LTS (HVM), SSD Volume Type - ami-0c55b159cbfafe1f0 (64비트 x86)(Ubuntu Server 18.04 LTS (HVM),EBS General Purpose (SSD) Volume Type. Support available from Canonical)
- 나머지 인스턴스 생성시 옵션은 default 옵션
- 인바운드 규칙: http, https, ssh, 모든 트래픽의 소스를 위치무관, 사용자 지정 tcp: 3000 위치무관

# 개발 도구
- nodejs and npm
- mongodb

# 설치 방법
- sudo apt-get update
- sudo apt-get install nodejs
- sudo apt-get install npm
- unzip -o todo.zip

# 실행 방법
- 압축을 해제하고 todo directory 로 이동후

- nodemon index.js 
또는
- nohup node index.js &
명령어 실행

# 완료 목록
- 새로운 TODO(제목과 내용)를 작성할 수 있다. 
- TODO 항목을 삭제할 수 있다. 			           
- TODO 항목의 우선순위를 설정 및 조절할 수 있다.          
- 사용자의 선택에 의해 TODO에는 마감 기한을 넣을 수 있다.           
- TODO 목록을 볼 수 있다.				           
- TODO 항목에 대한 완료 처리를 할 수 있다.	           
- TODO 항목의 제목과 내용을 수정할 수 있다.	           
- 마감기한이 지난 TODO에 대해 알림을 노출할 수 있다.                

# 결과 출력 퍼블릭 DNS(IPv4)
<http://ec2-18-216-126-43.us-east-2.compute.amazonaws.com:3000/todo>

# 개인 블로그
<https://hejh6408.tistory.com/>
