import type { Passage } from "@/types";

/**
 * ชุดเนื้อหารอบแรก เจาะอุปกรณ์คอมพิวเตอร์
 *
 * กฎของ Passage: `before + answer + after` ต้องได้ข้อความเดียวกับ `full` เสมอ
 * ตรวจได้ด้วย `npm run test:content` — ถ้าไม่ตรง เกมจะแสดงผลผิด
 */
export const PASSAGES: Passage[] = [
  // ── ชิ้นส่วนหลัก ─────────────────────────────────────────
  {
    id: "hw-core-thread",
    topic: "hardware-core",
    kind: "log",
    full: "$ nproc\n12   // thread คือหน่วยงานย่อยของ core ที่ทำงานพร้อมกันได้หลายงาน",
    cloze: {
      answer: "thread",
      accepted: ["thread", "threads", "threading"],
      before: "$ nproc\n12   // ",
      after: " คือหน่วยงานย่อยของ core ที่ทำงานพร้อมกันได้หลายงาน",
    },
    explanation: {
      th: "thread คือสายงานที่ CPU จัดสรรเวลาให้ หนึ่ง core มีหลาย thread ได้ ทำให้เปิดหลายโปรแกรมพร้อมกันไม่ค้าง",
      en: "A thread is a stream of work the CPU schedules; one core can host several threads, so many programs stay responsive at once",
    },
  },
  {
    id: "hw-core-core",
    topic: "hardware-core",
    kind: "log",
    full: "$ lscpu\nCPU(s):   12\nCore(s) per socket:   6",
    cloze: {
      answer: "Core",
      accepted: ["core", "cores", "CPU core", "cpu core"],
      before: "$ lscpu\nCPU(s):   12\n",
      after: "(s) per socket:   6",
    },
    explanation: {
      th: "core คือหน่วยประมวลผลย่อยใน CPU หนึ่งตัวมีหลาย core แต่ละ core ทำงานของตัวเองแยกกัน",
      en: "A core is an independent processing unit inside the CPU; one chip has several cores that work side by side",
    },
  },
  {
    id: "hw-core-ram",
    topic: "hardware-core",
    kind: "log",
    full: "$ grep MemTotal /proc/meminfo\nMemTotal:   32625888 kB   // RAM 32GB คือหน่วยความจำที่ทำงานเร็วของเครื่อง",
    cloze: {
      answer: "RAM",
      accepted: ["ram", "memory", "ram memory"],
      before: "$ grep MemTotal /proc/meminfo\nMemTotal:   32625888 kB   // ",
      after: " 32GB คือหน่วยความจำที่ทำงานเร็วของเครื่อง",
    },
    explanation: {
      th: "RAM เป็นที่เก็บข้อมูลของโปรแกรมที่กำลังเปิดอยู่ ปิดเครื่องแล้วข้อมูลหาย ต่างจากฮาร์ดดิสก์ที่เก็บถาวร",
      en: "RAM holds the data of programs currently open and loses it on power off, unlike a disk that stores data permanently",
    },
  },
  {
    id: "hw-core-ssd",
    topic: "hardware-core",
    kind: "log",
    full: "$ sudo smartctl -i /dev/nvme0n1 | grep 'Model Number'\nModel Number:   Samsung SSD 980 500GB",
    cloze: {
      answer: "SSD",
      accepted: ["ssd", "solid state drive"],
      before: "$ sudo smartctl -i /dev/nvme0n1 | grep 'Model Number'\nModel Number:   Samsung ",
      after: " 980 500GB",
    },
    explanation: {
      th: "SSD เก็บข้อมูลในชิปแฟลช ไม่มีชิ้นส่วนที่เคลื่อนไหว จึงเปิดเร็วกว่าและทนแรงกระแทกกว่า",
      en: "An SSD stores data in flash chips with no moving parts, so it opens faster and survives shocks better",
    },
  },
  {
    id: "hw-core-hdd",
    topic: "hardware-core",
    kind: "log",
    full: "$ cat /sys/block/sda/queue/rotational\n1   // ค่า 1 แปลว่าเป็น HDD ที่ยังใช้จานหมุนอยู่",
    cloze: {
      answer: "HDD",
      accepted: ["hdd", "hard disk drive", "hard drive"],
      before: "$ cat /sys/block/sda/queue/rotational\n1   // ค่า 1 แปลว่าเป็น ",
      after: " ที่ยังใช้จานหมุนอยู่",
    },
    explanation: {
      th: "HDD ใช้จานแม่เหล็กหมุนไปหาตำแหน่งข้อมูล จึงช้าและไวต่อการสั่นสะเทือนกว่า SSD",
      en: "An HDD spins magnetic platters to locate data, which is slower and more sensitive to vibration than an SSD",
    },
  },
  {
    id: "hw-core-nvme",
    topic: "hardware-core",
    kind: "log",
    full: "PS C:\\> Get-PhysicalDisk\nFriendlyName : Samsung SSD 980 PRO 2TB\nBusType      : NVMe   // ช่องทางของ SSD ที่ต่อผ่านสล็อต M.2 บนเมนบอร์ด",
    cloze: {
      answer: "NVMe",
      accepted: ["nvme", "m.2", "m2"],
      before: "PS C:\\> Get-PhysicalDisk\nFriendlyName : Samsung SSD 980 PRO 2TB\nBusType      : ",
      after: "   // ช่องทางของ SSD ที่ต่อผ่านสล็อต M.2 บนเมนบอร์ด",
    },
    explanation: {
      th: "NVMe คือช่องทางสื่อสารกับ SSD ผ่านสล็อต M.2 ส่งข้อมูลได้เร็วกว่าการต่อแบบ SATA หลายเท่า",
      en: "NVMe is the link to an SSD through an M.2 slot, delivering far more throughput than a SATA connection",
    },
  },
  {
    id: "hw-core-psu",
    topic: "hardware-core",
    kind: "log",
    full: "$ sudo dmidecode -t 39\nMax Power : 650 Watt   // PSU คือหน่วยจ่ายไฟ ยิ่งวัตต์สูงยิ่งจ่ายพอกับชิ้นส่วนทั้งเครื่อง",
    cloze: {
      answer: "PSU",
      accepted: ["psu", "power supply", "power supply unit"],
      before: "$ sudo dmidecode -t 39\nMax Power : 650 Watt   // ",
      after: " คือหน่วยจ่ายไฟ ยิ่งวัตต์สูงยิ่งจ่ายพอกับชิ้นส่วนทั้งเครื่อง",
    },
    explanation: {
      th: "PSU แปลงไฟจากปลั๊กบ้านให้เป็นไฟที่คอมพิวเตอร์ใช้ได้ ถ้าวัตต์ไม่พอเครื่องจะดับเองหรือเพี้ยนแบบสุ่มๆ",
      en: "The PSU converts wall power into what the computer can use; too few watts causes random shutdowns or instability",
    },
  },
  {
    id: "hw-core-motherboard",
    topic: "hardware-core",
    kind: "log",
    full: "$ sudo dmidecode -t 2\nBase Board Information\n  Product Name: ROG STRIX B550-F   // บอร์ดนี้คือ motherboard ที่เชื่อมทุกชิ้นส่วนเข้าด้วยกัน",
    cloze: {
      answer: "motherboard",
      accepted: ["motherboard", "mainboard", "mobo"],
      before: "$ sudo dmidecode -t 2\nBase Board Information\n  Product Name: ROG STRIX B550-F   // บอร์ดนี้คือ ",
      after: " ที่เชื่อมทุกชิ้นส่วนเข้าด้วยกัน",
    },
    explanation: {
      th: "motherboard คือแผงวงจรหลักที่ให้ CPU, RAM, การ์ดจอ และฮาร์ดดิสก์เชื่อมพูดกันได้",
      en: "The motherboard is the main board that lets the CPU, RAM, graphics card, and disks talk to each other",
    },
  },
  {
    id: "hw-core-bios",
    topic: "hardware-core",
    kind: "log",
    full: "$ sudo dmidecode -t 0\nBIOS Information\n  Vendor: American Megatrends Inc.   // BIOS เป็นซอฟต์แวร์ในเมนบอร์ดที่ตั้งค่าฮาร์ดแวร์ตอนเปิดเครื่อง",
    cloze: {
      answer: "BIOS",
      accepted: ["bios", "uefi", "firmware"],
      before: "$ sudo dmidecode -t 0\nBIOS Information\n  Vendor: American Megatrends Inc.   // ",
      after: " เป็นซอฟต์แวร์ในเมนบอร์ดที่ตั้งค่าฮาร์ดแวร์ตอนเปิดเครื่อง",
    },
    explanation: {
      th: "BIOS เป็นซอฟต์แวร์ที่ตรวจฮาร์ดแวร์แล้วบูตระบบปฏิบัติการ เวอร์ชันใหม่ของมันเรียกว่า UEFI",
      en: "The BIOS is firmware that checks the hardware and then boots the OS; its modern version is called UEFI",
    },
  },
  {
    id: "hw-core-pcie",
    topic: "hardware-core",
    kind: "log",
    full: "$ lspci | grep -i ethernet\n03:00.0 Ethernet controller: Realtek RTL8111   // พอร์ตนี้เป็น PCIe รุ่นเก่า ความเร็วต่ำกว่ารุ่นปัจจุบัน",
    cloze: {
      answer: "PCIe",
      accepted: ["pcie", "pci express", "pci-e", "pci"],
      before: "$ lspci | grep -i ethernet\n03:00.0 Ethernet controller: Realtek RTL8111   // พอร์ตนี้เป็น ",
      after: " รุ่นเก่า ความเร็วต่ำกว่ารุ่นปัจจุบัน",
    },
    explanation: {
      th: "PCIe คือช่องมาตรฐานที่เสียบการ์ดจอ การ์ดเสียง และการ์ดเน็ต ยิ่งรุ่นใหม่ยิ่งส่งข้อมูลเร็วกว่า",
      en: "PCIe is the standard slot for graphics, sound, and network cards; newer revisions transfer data faster",
    },
  },
  {
    id: "hw-core-gpu",
    topic: "hardware-core",
    kind: "log",
    full: "$ nvidia-smi --query-gpu=name,memory.total --format=csv\nname, memory.total\nNVIDIA GeForce RTX 3060, 12288 MiB   // GPU ตัวนี้มี VRAM 12GB",
    cloze: {
      answer: "GPU",
      accepted: ["gpu", "graphics card", "graphics processing unit", "vga"],
      before: "$ nvidia-smi --query-gpu=name,memory.total --format=csv\nname, memory.total\nNVIDIA GeForce RTX 3060, 12288 MiB   // ",
      after: " ตัวนี้มี VRAM 12GB",
    },
    explanation: {
      th: "GPU คือชิปที่รับภาระเรื่องภาพ แยกจาก CPU ทำให้เล่นเกมและตัดต่อวิดีโอได้ลื่นโดยไม่ดึง CPU",
      en: "The GPU takes on graphics work separately from the CPU, which keeps games and video editing smooth",
    },
  },
  {
    id: "hw-core-fan",
    topic: "hardware-core",
    kind: "log",
    full: "$ sensors | grep fan\nfan1:   1200 RPM   // fan คือพัดลมที่ดูดลมเย็นเข้ามาในเคส",
    cloze: {
      answer: "fan",
      accepted: ["fan", "fans", "cooling fan"],
      before: "$ sensors | grep fan\nfan1:   1200 RPM   // ",
      after: " คือพัดลมที่ดูดลมเย็นเข้ามาในเคส",
    },
    explanation: {
      th: "fan คือพัดลมที่ดูดลมเย็นเข้ามาในเคส ถ้าไม่มีลมไหล CPU จะร้อนจนเครื่องดับเองได้",
      en: "Fans pull cool air into the case; without moving air the CPU overheats and can shut the machine down",
    },
  },
  {
    id: "hw-core-driver",
    topic: "hardware-core",
    kind: "log",
    full: "$ lsmod | head -3\nModule          Size  Used by\nnvidia     39000000  2   // driver ของการ์ดจอถูกโหลดเข้ามาแล้ว",
    cloze: {
      answer: "driver",
      accepted: ["driver", "drivers", "device driver"],
      before: "$ lsmod | head -3\nModule          Size  Used by\nnvidia     39000000  2   // ",
      after: " ของการ์ดจอถูกโหลดเข้ามาแล้ว",
    },
    explanation: {
      th: "driver คือซอฟต์แวร์ที่ทำให้ Windows สั่งการฮาร์ดแวร์ได้ ถ้าไม่มี driver อุปกรณ์นั้นจะใช้ไม่ได้",
      en: "A driver is the software that lets Windows control a piece of hardware; without one the device cannot be used",
    },
  },

  // ── การ์ดจอและความแรง ─────────────────────────────────────
  {
    id: "hw-perf-clockspeed",
    topic: "hardware-display",
    kind: "log",
    full: "$ cat /sys/devices/system/cpu/cpu0/cpufreq/scaling_cur_freq\n3200000   // ความถี่ 3200MHz นี้คือ clock speed ที่ CPU ทำงานอยู่ตอนนี้",
    cloze: {
      answer: "clock speed",
      accepted: ["clock speed", "clockspeed", "frequency", "mhz", "ghz"],
      before: "$ cat /sys/devices/system/cpu/cpu0/cpufreq/scaling_cur_freq\n3200000   // ความถี่ 3200MHz นี้คือ ",
      after: " ที่ CPU ทำงานอยู่ตอนนี้",
    },
    explanation: {
      th: "clock speed คือจำนวนรอบที่ CPU ทำงานต่อวินาที ยิ่งสูงยิ่งเร็วขึ้น แต่กินไฟและร้อนขึ้นตาม",
      en: "Clock speed is how many cycles the CPU completes per second; higher is faster but draws more power and heat",
    },
  },
  {
    id: "hw-perf-cache",
    topic: "hardware-display",
    kind: "log",
    full: "$ cat /sys/devices/system/cpu/cpu0/cache/index3/size\n8192K   // cache ของ CPU เก็บข้อมูลที่ใช้บ่อยไว้ใกล้ตัวเร็วกว่า RAM",
    cloze: {
      answer: "cache",
      accepted: ["cache", "caching", "cpu cache"],
      before: "$ cat /sys/devices/system/cpu/cpu0/cache/index3/size\n8192K   // ",
      after: " ของ CPU เก็บข้อมูลที่ใช้บ่อยไว้ใกล้ตัวเร็วกว่า RAM",
    },
    explanation: {
      th: "cache เป็นหน่วยความจำเล็กใน CPU ที่เก็บข้อมูลที่ใช้ซ้ำบ่อย เข้าถึงได้เร็วกว่า RAM หลายเท่า",
      en: "The cache is a small memory inside the CPU holding frequently reused data, reachable far faster than RAM",
    },
  },
  {
    id: "hw-perf-dualchannel",
    topic: "hardware-display",
    kind: "log",
    full: "$ dmidecode -t 17 | grep Size\nSize: 8192 MB\nSize: 8192 MB   // สองแถวแบบนี้ทำงานเป็น Dual Channel เร็วกว่าแบบ Single Channel",
    cloze: {
      answer: "Dual Channel",
      accepted: ["Dual Channel", "dual channel", "dual-channel", "dualchannel"],
      before: "$ dmidecode -t 17 | grep Size\nSize: 8192 MB\nSize: 8192 MB   // สองแถวแบบนี้ทำงานเป็น ",
      after: " เร็วกว่าแบบ Single Channel",
    },
    explanation: {
      th: "Dual Channel ใช้ RAM สองแถวพร้อมกันแทนที่จะรอทีละแถว งานที่ต้องอ่านข้อมูลเยอะจะเร็วขึ้นราว 20%",
      en: "Dual Channel reads two RAM sticks at once instead of one after the other, gaining roughly 20% on memory-heavy work",
    },
  },
  {
    id: "hw-perf-overclock",
    topic: "hardware-display",
    kind: "log",
    full: "$ nvidia-smi -q -d CLOCK\nGraphics    : 1770 MHz   // การบังคับให้การ์ดทำงานเร็วกว่าค่าโรงหลักเรียกว่า overclock",
    cloze: {
      answer: "overclock",
      accepted: ["overclock", "overclocking", "over clock"],
      before: "$ nvidia-smi -q -d CLOCK\nGraphics    : 1770 MHz   // การบังคับให้การ์ดทำงานเร็วกว่าค่าโรงหลักเรียกว่า ",
      after: "",
    },
    explanation: {
      th: "overclock คือการบังคับให้ชิ้นส่วนทำงานเร็วกว่าค่าโรงหลัก ได้คะแนนเพิ่มแต่ความร้อนและอาการเพี้ยนก็เพิ่มตาม",
      en: "Overclocking forces a part above its rated speed, gaining performance at the cost of more heat and instability",
    },
  },
  {
    id: "hw-perf-throttle",
    topic: "hardware-display",
    kind: "log",
    full: "WARNING: GPU temperature reached 95C, performance throttled   // เครื่องร้อนจนตัวเองลดความเร็วลง",
    cloze: {
      answer: "throttled",
      accepted: ["throttled", "throttling", "throttle"],
      before: "WARNING: GPU temperature reached 95C, performance ",
      after: "   // เครื่องร้อนจนตัวเองลดความเร็วลง",
    },
    explanation: {
      th: "การ throttling เกิดเมื่ออุณหภูมิสูงเกินกำหนด เครื่องจะลดความเร็วเองเพื่อไม่ให้ชิ้นส่วนพัง",
      en: "Throttling happens when temperature passes a limit; the machine slows itself down to protect the part",
    },
  },
  {
    id: "hw-perf-bottleneck",
    topic: "hardware-display",
    kind: "log",
    full: "CPU 12% | GPU 99%   // จุดที่เป็น bottleneck คือฝั่ง GPU เพราะ CPU ยังว่างอยู่เฉยๆ",
    cloze: {
      answer: "bottleneck",
      accepted: ["bottleneck", "bottlenecking"],
      before: "CPU 12% | GPU 99%   // จุดที่เป็น ",
      after: " คือฝั่ง GPU เพราะ CPU ยังว่างอยู่เฉยๆ",
    },
    explanation: {
      th: "bottleneck คือชิ้นส่วนที่ช้าที่สุดในสายงานนั้น อัปเกรดตรงนี้เท่าไรก็ทั้งระบบยังเร็วไม่เกินจุดนี้",
      en: "The bottleneck is the slowest part in the chain; no amount of upgrading it alone speeds up the whole system",
    },
  },
  {
    id: "hw-perf-refresh",
    topic: "hardware-display",
    kind: "log",
    full: "$ xrandr | grep connected\nHDMI-1 connected 3840x2160 60.00Hz   // ตัวเลข 60.00 นี้คือ refresh rate ของจอ",
    cloze: {
      answer: "refresh rate",
      accepted: ["refresh rate", "refreshrate", "hz"],
      before: "$ xrandr | grep connected\nHDMI-1 connected 3840x2160 60.00Hz   // ตัวเลข 60.00 นี้คือ ",
      after: " ของจอ",
    },
    explanation: {
      th: "refresh rate คือจำนวนครั้งที่จอวาดภาพในหนึ่งวินาที 60Hz คือค่ามาตรฐาน ส่วน 144Hz ภาพจะลื่นกว่ามาก",
      en: "Refresh rate is how many times the screen redraws per second; 60Hz is standard while 144Hz looks much smoother",
    },
  },
  {
    id: "hw-perf-vsync",
    topic: "hardware-display",
    kind: "log",
    full: "$ xrandr --verbose | grep vsync\n  60.00Hz +vsync   // เปิด VSync ไว้ภาพจะไม่ขาดแนวถึงแม้ได้เฟรมน้อยลง",
    cloze: {
      answer: "VSync",
      accepted: ["VSync", "v-sync", "vertical sync"],
      before: "$ xrandr --verbose | grep vsync\n  60.00Hz +vsync   // เปิด ",
      after: " ไว้ภาพจะไม่ขาดแนวถึงแม้ได้เฟรมน้อยลง",
    },
    explanation: {
      th: "VSync จับเวลาให้การ์ดจอวาดภาพตรงกับจอเสมอ ตัดอาการภาพขาดได้ แลกกับการทิ้งเฟรมไปเปล่าๆ",
      en: "VSync paces the GPU to the display, removing tearing at the cost of dropped frames",
    },
  },
  {
    id: "hw-perf-raid",
    topic: "hardware-display",
    kind: "log",
    full: "$ cat /proc/mdstat\nmd0 : raid5 sdb1[1] sdc1[2] sdd1[3]   // RAID รวมหลายไดรฟ์เป็นชุดเดียวและทนต่อการเสียได้",
    cloze: {
      answer: "RAID",
      accepted: ["RAID", "raid"],
      before: "$ cat /proc/mdstat\nmd0 : raid5 sdb1[1] sdc1[2] sdd1[3]   // ",
      after: " รวมหลายไดรฟ์เป็นชุดเดียวและทนต่อการเสียได้",
    },
    explanation: {
      th: "RAID คือการเอาฮาร์ดหลายลูกมารวมกันเป็นชุดเดียว ได้ทั้งความจุที่รวมกันและความทนทานมากขึ้น",
      en: "RAID combines several disks into one set, gaining combined capacity and tolerance for failure",
    },
  },
  {
    id: "hw-perf-usb",
    topic: "hardware-display",
    kind: "log",
    full: "$ lsusb\nBus 001 Device 004: ID 1d6b:0003 Linux Foundation 3.0 root hub   // พอร์ตนี้เป็น USB 3.0 ซึ่งถ่ายโอนข้อมูลได้เร็วกว่ารุ่นเก่าหลายเท่า",
    cloze: {
      answer: "USB 3.0",
      accepted: ["USB 3.0", "usb 3", "usb3", "usb"],
      before: "$ lsusb\nBus 001 Device 004: ID 1d6b:0003 Linux Foundation 3.0 root hub   // พอร์ตนี้เป็น ",
      after: " ซึ่งถ่ายโอนข้อมูลได้เร็วกว่ารุ่นเก่าหลายเท่า",
    },
    explanation: {
      th: "USB คือช่องเสียบอุปกรณ์ภายนอก ยิ่งเวอร์ชันสูงยิ่งถ่ายข้อมูลเร็ว ตอนนี้มีถึงรุ่น 3.2 และรุ่นเร็วกว่า",
      en: "USB is the port for peripherals; higher versions move data faster, now up to 3.2 and beyond",
    },
  },
  {
    id: "hw-perf-benchmark",
    topic: "hardware-display",
    kind: "log",
    full: "Geekbench 6.1.0: 1520 single-core, 4820 multi-core   // ค่านี้คือ benchmark ใช้เทียบเครื่องกับเครื่องอื่น",
    cloze: {
      answer: "benchmark",
      accepted: ["benchmark", "benchmarks", "benchmarking"],
      before: "Geekbench 6.1.0: 1520 single-core, 4820 multi-core   // ค่านี้คือ ",
      after: " ใช้เทียบเครื่องกับเครื่องอื่น",
    },
    explanation: {
      th: "benchmark คือผลทดสอบมาตรฐานของเครื่อง ใช้เทียบกับรุ่นอื่นได้ แต่คะแนนของแต่ละโปรแกรมเทียบข้ามกันไม่ได้",
      en: "A benchmark is a standardised test result used to compare machines, but scores from different apps cannot be compared",
    },
  },
  {
    id: "hw-perf-pixels",
    topic: "hardware-display",
    kind: "log",
    full: "Recommended display resolution: 1920x1080   // ยิ่งจำนวน pixels มาก ภาพยิ่งคมแต่การ์ดต้องทำงานหนักขึ้น",
    cloze: {
      answer: "pixels",
      accepted: ["pixel", "pixels"],
      before: "Recommended display resolution: 1920x1080   // ยิ่งจำนวน ",
      after: " มาก ภาพยิ่งคมแต่การ์ดต้องทำงานหนักขึ้น",
    },
    explanation: {
      th: "pixel คือจุดสีเล็กที่ประกอบเป็นภาพ ความละเอียด 1920x1080 คือกว้าง 1920 สูง 1080 จุด",
      en: "A pixel is one tiny colour dot; 1920x1080 means 1920 dots wide by 1080 dots tall",
    },
  },

  // ── ตรวจอาการเสีย ─────────────────────────────────────────
  {
    id: "hw-diag-post",
    topic: "hardware-diag",
    kind: "log",
    full: "No bootable device detected\nPress F12 for boot menu   // ข้อความนี้มาจากขั้นตอน POST ก่อนบูตระบบปฏิบัติการ",
    cloze: {
      answer: "POST",
      accepted: ["POST", "post", "power on self test", "power-on self-test"],
      before: "No bootable device detected\nPress F12 for boot menu   // ข้อความนี้มาจากขั้นตอน ",
      after: " ก่อนบูตระบบปฏิบัติการ",
    },
    explanation: {
      th: "POST คือชุดทดสอบที่เมนบอร์ดทำทันทีที่กดเปิดเครื่อง ถ้าเสียงบี๊ปไม่ดังหรือไฟไม่ขึ้น มักเป็นที่ POST",
      en: "POST is the boot-time self test the motherboard runs the instant you press power; no beep or no light usually points there",
    },
  },
  {
    id: "hw-diag-bsod",
    topic: "hardware-diag",
    kind: "log",
    full: "STOP code: 0x0000007B INACCESSIBLE_BOOT_DEVICE   // หน้าจอฟ้าแบบนี้เรียกว่า BSOD",
    cloze: {
      answer: "BSOD",
      accepted: ["BSOD", "blue screen", "blue screen of death"],
      before: "STOP code: 0x0000007B INACCESSIBLE_BOOT_DEVICE   // หน้าจอฟ้าแบบนี้เรียกว่า ",
      after: "",
    },
    explanation: {
      th: "BSOD คือหน้าจอฟ้าที่ Windows แสดงเมื่อระบบล่มระดับแกนกลาง สาเหตุที่พบบ่อยคือไดรฟ์เสียหรือไดรเวอร์ไม่เข้ากัน",
      en: "A BSOD is the blue screen Windows shows after a kernel-level crash, often from a failing disk or a mismatched driver",
    },
  },
  {
    id: "hw-diag-smart",
    topic: "hardware-diag",
    kind: "log",
    full: "$ sudo smartctl -H /dev/sda\nSMART overall-health self-assessment test result: PASSED   // ค่า SMART นี้บอกว่าฮาร์ดยังไม่ถึงขั้นต้องเปลี่ยน",
    cloze: {
      answer: "SMART",
      accepted: ["SMART", "smart", "smartctl", "S.M.A.R.T."],
      before: "$ sudo smartctl -H /dev/sda\nSMART overall-health self-assessment test result: PASSED   // ค่า ",
      after: " นี้บอกว่าฮาร์ดยังไม่ถึงขั้นต้องเปลี่ยน",
    },
    explanation: {
      th: "SMART คือระบบที่ฮาร์ดดิสก์ใช้เฝ้าดูสุขภาพตัวเอง เช่น ชิ้นส่วนสึกหรือมี sector เพี้ยน ควรเช็กเป็นนิสัย",
      en: "SMART is the self-monitoring system disks use to report wear and bad sectors; check it regularly",
    },
  },
  {
    id: "hw-diag-badsector",
    topic: "hardware-diag",
    kind: "log",
    full: "Sector 19456 has 12 uncorrectable errors   // bad sector คือส่วนของฮาร์ดที่อ่านกลับมาไม่ถูกต้อง",
    cloze: {
      answer: "bad sector",
      accepted: ["bad sector", "bad sectors", "badsector", "sector"],
      before: "Sector 19456 has 12 uncorrectable errors   // ",
      after: " คือส่วนของฮาร์ดที่อ่านกลับมาไม่ถูกต้อง",
    },
    explanation: {
      th: "bad sector คือจุดบนฮาร์ดที่อ่านข้อมูลออกมาไม่ตรง ถ้ามีจำนวนเพิ่มขึ้นเรื่อยๆ ให้รีบสำรองข้อมูลแล้วเปลี่ยนฮาร์ด",
      en: "A bad sector is a spot the drive can no longer read correctly; a rising count means back up now and replace the disk",
    },
  },
  {
    id: "hw-diag-airflow",
    topic: "hardware-diag",
    kind: "log",
    full: "$ sensors | grep -E 'fan|Core'\nfan1:   0 RPM\nCore 0:   +70.0°C   // airflow เป็นศูนย์เพราะพัดลมไม่หมุน ความร้อนก็ออกไม่ได้",
    cloze: {
      answer: "airflow",
      accepted: ["airflow", "air flow"],
      before: "$ sensors | grep -E 'fan|Core'\nfan1:   0 RPM\nCore 0:   +70.0°C   // ",
      after: " เป็นศูนย์เพราะพัดลมไม่หมุน ความร้อนก็ออกไม่ได้",
    },
    explanation: {
      th: "airflow คือการไหลเวียนของอากาศในเคส ถ้าพัดลมไม่หมุนหรือฝุ่นอุดตัน ความร้อนจะไม่ออกจากเครื่อง",
      en: "Airflow is the circulation of air inside the case; if fans stop or dust blocks them, heat cannot escape",
    },
  },
  {
    id: "hw-diag-thermal",
    topic: "hardware-diag",
    kind: "log",
    full: "Kernel panic - not syncing: thermal shutdown   // เครื่องร้อนจนระบบสั่งตัดไฟตัวเองเพื่อไม่ให้ชิ้นส่วนขาด",
    cloze: {
      answer: "thermal shutdown",
      accepted: ["thermal shutdown", "shutdown", "overheat", "overheating"],
      before: "Kernel panic - not syncing: ",
      after: "   // เครื่องร้อนจนระบบสั่งตัดไฟตัวเองเพื่อไม่ให้ชิ้นส่วนขาด",
    },
    explanation: {
      th: "thermal shutdown คือการที่เครื่องตัดไฟตัวเองเพราะร้อนเกินกำหนด มักแก้ได้ด้วยการเปลี่ยนซิ้งค์หรือเพิ่มลมเย็น",
      en: "A thermal shutdown is the machine powering off because it exceeded its temperature limit; a new heatsink or more airflow usually fixes it",
    },
  },
  {
    id: "hw-diag-voltage",
    topic: "hardware-diag",
    kind: "log",
    full: "$ sensors | grep in0\nin0:   +11.40 V   // voltage ไฟจาก PSU ตกจาก 12V เกินไป เครื่องจะเพี้ยนหรือดับเอง",
    cloze: {
      answer: "voltage",
      accepted: ["voltage", "volt", "volts"],
      before: "$ sensors | grep in0\nin0:   +11.40 V   // ",
      after: " ไฟจาก PSU ตกจาก 12V เกินไป เครื่องจะเพี้ยนหรือดับเอง",
    },
    explanation: {
      th: "voltage คือแรงดันไฟที่ย่งให้ชิ้นส่วนทำงาน เพี้ยนไปแค่นิดเดียวก็ทำให้เครื่องดับหรือการ์ดจอพังได้",
      en: "Voltage is the electrical pressure driving the parts; even a small dip can crash the machine or damage a graphics card",
    },
  },
  {
    id: "hw-diag-memorytest",
    topic: "hardware-diag",
    kind: "log",
    full: "MemTest86+ v6.20: 4 passes, 0 errors   // memory test นี้ใช้หาบล็อก RAM ที่เสีย ถ้าขึ้น error ให้เปลี่ยนแรม",
    cloze: {
      answer: "memory test",
      accepted: ["memory test", "memtest", "memtest86", "memtest86+", "ram test"],
      before: "MemTest86+ v6.20: 4 passes, 0 errors   // ",
      after: " นี้ใช้หาบล็อก RAM ที่เสีย ถ้าขึ้น error ให้เปลี่ยนแรม",
    },
    explanation: {
      th: "memory test คือการเขียนอ่าน RAM ทั้งแรมซ้ำเพื่อหาบล็อกที่ผิดพลาด เครื่องดับเองแบบไม่มีเหตุผลมักมาจากตรงนี้",
      en: "A memory test writes and reads RAM repeatedly to find faulty blocks; unexplained random crashes often start here",
    },
  },
  {
    id: "hw-diag-devicemanager",
    topic: "hardware-diag",
    kind: "log",
    full: "เปิดหน้าต่าง Device Manager → อุปกรณ์ 1 รายการมีเครื่องหมายตกเตือน   // เลือกอัปเดต driver ให้ตรงรุ่นก่อน",
    cloze: {
      answer: "Device Manager",
      accepted: ["Device Manager", "device manager", "devicemanager"],
      before: "เปิดหน้าต่าง ",
      after: " → อุปกรณ์ 1 รายการมีเครื่องหมายตกเตือน   // เลือกอัปเดต driver ให้ตรงรุ่นก่อน",
    },
    explanation: {
      th: "Device Manager คือที่รวมไดรเวอร์ทุกตัวของ Windows ถ้ามีเครื่องหมายตกเตือน แปลว่าฮาร์ดแวร์ตัวนั้นยังทำงานไม่ปกติ",
      en: "Device Manager lists every Windows driver; a warning mark means that hardware is not working properly",
    },
  },
  {
    id: "hw-diag-compatibility",
    topic: "hardware-diag",
    kind: "log",
    full: "Warning: the memory module is not compatible with this motherboard   // compatibility ของเมนบอร์ดกับแรมต้องตรงกัน",
    cloze: {
      answer: "compatible",
      accepted: ["compatible", "compatibility", "incompatible"],
      before: "Warning: the memory module is not ",
      after: " with this motherboard   // compatibility ของเมนบอร์ดกับแรมต้องตรงกัน",
    },
    explanation: {
      th: "compatibility ของเมนบอร์ดกับ CPU และแรมต้องตรงรุ่น ถ้าไม่ตรงอาจเปิดไม่ขึ้นหรือทำงานไม่เสถียร",
      en: "Compatibility between the motherboard, CPU, and RAM must match; a mismatch may refuse to boot or behave unstably",
    },
  },
  {
    id: "hw-diag-backup",
    topic: "hardware-diag",
    kind: "log",
    full: "$ rsync -a --delete /home/user/ /mnt/backup/   // backup คือสำเนาข้อมูลที่เก็บไว้อีกชุดนอกฮาร์ดเดิม",
    cloze: {
      answer: "backup",
      accepted: ["backup", "backups", "back up"],
      before: "$ rsync -a --delete /home/user/ /mnt/backup/   // ",
      after: " คือสำเนาข้อมูลที่เก็บไว้อีกชุดนอกฮาร์ดเดิม",
    },
    explanation: {
      th: "backup ควรอยู่คนละเครื่องหรือคนละฮาร์ด เพราะฮาร์ดพังมักพังพร้อมกันทั้งชุดจนสำรองก็เป็นภาระ",
      en: "Keep a backup on a separate drive or machine, because a failing disk often takes the whole array with it",
    },
  },
  {
    id: "hw-diag-dust",
    topic: "hardware-diag",
    kind: "log",
    full: "เปิดฝาคอมพิวเตอร์แล้วเจอฝุ่นหนาห่อกองพัดลม   // dust ที่สะสมกั้นลม ทำให้อุณหภูมิพุ่งขึ้นทันที",
    cloze: {
      answer: "dust",
      accepted: ["dust", "dirt"],
      before: "เปิดฝาคอมพิวเตอร์แล้วเจอฝุ่นหนาห่อกองพัดลม   // ",
      after: " ที่สะสมกั้นลม ทำให้อุณหภูมิพุ่งขึ้นทันที",
    },
    explanation: {
      th: "ฝุ่นที่สะสมในเคสทำให้ลมไหลไม่ได้และอุณหภูมิขึ้น เป่าฝุ่นออกเป็นงานบำรุงที่ทำเองได้และเห็นผลทันที",
      en: "Dust inside the case blocks airflow and raises temperatures; blowing it out is basic maintenance with an immediate effect",
    },
  },
];
