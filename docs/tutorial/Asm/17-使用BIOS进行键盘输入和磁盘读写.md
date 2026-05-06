# 使用 BIOS 进行键盘输入和磁盘读写

## int 9 与键盘缓冲区

键盘每次产生扫描码，触发 9 号中断，BIOS int 9 例程负责：

1. 从 `60h` 端口读取扫描码
2. 将扫描码 + ASCII 码转化后写入**键盘缓冲区**（内存中的环形队列，可存 15 个字）
3. 对特殊键（Shift/Ctrl/Alt/CapsLock 等）更新**键盘状态字节**

## int 16h：读取键盘输入

`int 16h`（功能号 0）从键盘缓冲区读取一次输入：

```asm
mov ah, 0
int 16h
; 返回：ah = 扫描码，al = ASCII 码
; 若缓冲区为空，一直等待（阻塞）
```

int 9 和 int 16h 是一对：

- **int 9**（BIOS）：硬件触发，将键盘数据写入缓冲区
- **int 16h**（BIOS）：程序调用，从缓冲区读出键盘数据

**示例：** 根据输入 r/g/b 改变屏幕字符颜色

```asm
assume cs:code

code segment
start:
    mov ah, 0
    int 16h                 ; 等待键盘输入

    mov ah, 1               ; 默认颜色属性（蓝色）
    cmp al, 'r'
    je red
    cmp al, 'g'
    je green
    cmp al, 'b'
    je blue
    jmp short sret

  red:   shl ah, 1          ; 红色 = 4
green:   shl ah, 1          ; 绿色 = 2（注意：red 流程会继续到 green 再 shl）

blue:
    mov bx, 0b800h
    mov es, bx
    mov bx, 1               ; 从第 0 字符的属性字节开始
    mov cx, 2000            ; 屏幕共 80*25 = 2000 个字符

  s:
    and byte ptr es:[bx], 11111000b   ; 清除颜色低 3 位
    or  es:[bx], ah                   ; 写入新颜色
    add bx, 2
    loop s

sret:
    mov ax, 4c00h
    int 21h
code ends
end start
```

## 字符串输入（使用字符栈）

基本字符串输入需要支持：

- 显示已输入字符
- 退格键删除最后一个字符
- 回车键结束输入

**设计思路：** 用栈管理字符串，维护 `top` 指针。

### 字符栈子程序

```asm
; 参数：(ah) = 功能号
;   0 = 入栈  (al) = 字符
;   1 = 出栈  返回 (al) = 字符
;   2 = 显示  (dh)(dl) = 行列
; ds:si 指向字符栈空间

charstack:
    jmp short charstart
    table dw charpush, charpop, charshow
    top   dw 0

charstart:
    push bx
    push dx
    push di
    push es

    cmp ah, 2
    ja  sret
    mov bl, ah
    mov bh, 0
    add bx, bx
    jmp word ptr table[bx]  ; 跳到对应功能

charpush:
    mov bx, top
    mov [si][bx], al
    inc top
    jmp sret

charpop:
    cmp top, 0
    je  sret
    dec top
    mov bx, top
    mov al, [si][bx]
    jmp sret

charshow:
    mov bx, 0b800h
    mov es, bx
    mov al, 160
    mov ah, 0
    mul dh              ; 行 * 160 = 行偏移
    mov di, ax
    add dl, dl
    mov dh, 0
    add di, dx          ; + 列 * 2

    mov bx, 0
charshows:
    cmp bx, top
    jne noempty
    mov byte ptr es:[di], ' '   ; 光标后补空格
    jmp sret
noempty:
    mov al, [si][bx]
    mov es:[di], al
    mov byte ptr es:[di+2], ' ' ; 下一个位置预清空
    inc bx
    add di, 2
    jmp charshows

sret:
    pop es
    pop di
    pop dx
    pop bx
    ret
```

### 字符串输入主程序

```asm
getstr:
    push ax
getstrs:
    mov ah, 0
    int 16h
    cmp al, 20h
    jb  nochar              ; ASCII < 0x20 = 控制字符

    ; 普通字符：入栈并显示
    mov ah, 0
    call charstack
    mov ah, 2
    call charstack
    jmp getstrs

nochar:
    cmp ah, 0eh             ; 退格键扫描码
    je  backspace
    cmp ah, 1ch             ; 回车键扫描码
    je  enter
    jmp getstrs

backspace:
    mov ah, 1               ; 出栈
    call charstack
    mov ah, 2               ; 重新显示
    call charstack
    jmp getstrs

enter:
    mov ah, 0
    mov al, 0               ; 压入 0 作为字符串结束标记
    call charstack
    mov ah, 2
    call charstack
    pop ax
    ret
```

## int 13h：磁盘读写

BIOS int 13h 以**扇区**为单位读写磁盘（3.5 寸软盘：2面 × 80磁道 × 18扇区 × 512字节 = 1.44MB）。

### 读扇区（ah=2）

```asm
; 读 0 面 0 道 1 扇区的内容到内存 0:200h
mov ax, 0
mov es, ax
mov bx, 200h

mov ah, 2       ; 功能号：读扇区
mov al, 1       ; 读取扇区数
mov ch, 0       ; 磁道号（从 0 开始）
mov cl, 1       ; 扇区号（从 1 开始！）
mov dh, 0       ; 磁头号（面号，从 0 开始）
mov dl, 0       ; 驱动器号（0 = 软驱 A）
int 13h

; 返回：成功 → (ah)=0，(al)=读入扇区数
;       失败 → (ah)=出错代码
```

### 写扇区（ah=3）

```asm
; 将内存 0:200h 的内容写入 0 面 0 道 1 扇区
mov ah, 3       ; 功能号：写扇区
mov al, 1
mov ch, 0
mov cl, 1
mov dh, 0
mov dl, 0
int 13h
```

> **注意：** 磁盘写操作具有破坏性，请在 DOSBox 中测试，不要对真实磁盘操作。

## 小结

| 中断    | 用途                          | 常用功能号                   |
| ------- | ----------------------------- | ---------------------------- |
| int 9   | 硬件键盘中断（BIOS 自动处理） | —                            |
| int 16h | 读键盘缓冲区                  | ah=0：等待并读取             |
| int 13h | 磁盘读写                      | ah=2：读；ah=3：写           |
| int 10h | 显示服务                      | ah=2：设光标；ah=9：显字符   |
| int 21h | DOS 服务                      | ah=9：显字符串；ah=4ch：退出 |
